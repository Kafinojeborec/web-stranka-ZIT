//lightbox funkcionalita - zvacsovanie fotiek po kliknuti
const lightbox = document.getElementById('lightbox'); //hlavny box cez celu obrazovku
const lightboxImg = document.getElementById('lightbox-img'); // prazdny tag kde sa vlozi fotka
const images = document.querySelectorAll('.gallery-card img'); //zoznam vsetkych obrazkov
const closebutton = document.querySelector('.close-button'); // tlacidlo X na zatvorenie okna

// umoznuje kliknut na kazdy obrazok v galerii a nastavi mu active element
images.forEach(img =>
{
    img.addEventListener('click', () =>
    {
        lightboxImg.src = img.src; // skopuruje source do lightboxu 
        lightbox.classList.add('active'); // nastavi mu active triedu (CSS)
    });
});

// spusti sa len v galerii kde je lightbox nastaveny
if (lightbox)
{   // po kliknuti na X sa zavrie lightbox tym ze mu odoberie triedu
    closebutton.addEventListener('click', () =>
    {
        lightbox.classList.remove('active');
    });
    // taktiez to zatvori pokial uzivatel klikne mimo fotky takze sa netreba spoliehat len na tlacidlo X
    lightbox.addEventListener('click', (e) =>
    {
        if (e.target === lightbox) // e prvok je ten, na ktory pouzivatel klikol, cize ak to je lightbox takze oblast mimo fotky tak sa zavrie
        {
            lightbox.classList.remove('active');
        }
    });
}

//prepinac light/dark modu
const lightbutton = document.getElementById('light-mode'); // inicializovanie tlacidiel
const darkbutton = document.getElementById('dark-mode');

function setTheme(theme)
{
    if (theme === 'light')
    {
        document.body.classList.add('light-mode'); // zapne CSS pravidlo na body
        if (lightbutton) lightbutton.classList.add('active'); // zvyrazni tlacidlo light modu (slnka)
        if (darkbutton) darkbutton.classList.remove('active'); // zrusi vybranie dark modu (mesiaca)
        localStorage.setItem('theme', 'light'); // ulozi volbu do pamate prehliadaca
    }
    else
    {   // to iste len naopak
        document.body.classList.remove('light-mode');
        if (lightbutton) lightbutton.classList.remove('active');
        if (darkbutton) darkbutton.classList.add('active');
        localStorage.setItem('theme', 'dark');
    }
}
// po nacitani inej podsranky skontrolujeme aka tema je v pamati, konkretne ci je to light mod, ak ano tak ho nechame inak prepneme na dark mode
if (localStorage.getItem('theme') === 'light')
{
    setTheme('light');
}
else
{
    setTheme('dark');
}

// ak mame na stranke tlacidla tak im pridame moznost kliknutia
if (lightbutton && darkbutton)
{
    lightbutton.addEventListener('click', () => setTheme('light'));
    darkbutton.addEventListener('click', () => setTheme('dark'));
}

//validacia kontaktneho formulara
const contactForm = document.getElementById('kontakt-form');
// vykona sa len vtedy ak sme na stranke s formularom
if (contactForm)
{   // nacitaju sa polozky formulara
    const menoInput = document.getElementById('meno');
    const emailInput = document.getElementById('email');
    const telefonInput = document.getElementById('telefon');
    const formStatus = document.getElementById('form-status');

    contactForm.addEventListener('submit', (e) => // zachytava udalost odoslania formulara
    {
        e.preventDefault(); // blokuje predvolene spravanie prehliadaca ako reload stranky
        // zo zadaneho textu v polickach orezeme pripadne medzery
        const meno = menoInput.value.trim();
        const email = emailInput.value.trim();
        const telefon = telefonInput.value.trim();

        if (meno === '')    // kontrola ci je prazdne meno
        {
            formStatus.textContent = 'Zadajte prosím meno';
            formStatus.className = 'form-status error'; // cervene farba erroru cez CSS
            return;
        }

        if (email === '' && telefon === '') // kontrola prazdneho emailu alebo telefonu
        {
            formStatus.textContent = 'Zadajte prosím email alebo telefónne číslo';
            formStatus.className = 'form-status error';
            return;
        }

        if ((email !== '' && (!email.includes('@') || !email.includes('.')))) // kontrola ci je prazdny email alebo ci mu nechyva "@" popripade "."
        {
            formStatus.textContent = 'Zadajte platnú emailovú adresu';
            formStatus.className = 'form-status error';
            return;
        }
        
        if (telefon !== '' && telefon.length < 9) // kontrola ci je policko pre telefon prazdne a mensie ako 9 cisiel cim je neplatne
        {
            formStatus.textContent = 'Zadajte platné telefónne číslo'
            formStatus.className = 'form-status error';
            return;
        }
        // odoslanie platneho formulara
        formStatus.textContent = 'Odoslané! Hneď sa Vám ozvem :3';
        formStatus.className = 'form-status success';
        contactForm.reset();
    });
}