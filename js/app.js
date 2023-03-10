/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
 */

/**
 * Define Global Variables
 *
 */

let sections = document.querySelectorAll ( 'section' );
const navBar = document.getElementById ( 'navbar__list' );
const Scroll = document.createDocumentFragment ();
const Top = document.getElementById ( 'BtmTop' );
const AddNew = document.getElementById ( 'AddSection' );

/**
 * End Global Variables
 * Start Helper Functions
 *
 */

// Helper viewport function
function ViewPort ( element ) {
    const rect = element.getBoundingClientRect ();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= ( window.innerHeight || document.documentElement.clientHeight ) &&
        rect.right <= ( window.innerWidth || document.documentElement.clientWidth )
    );
}

//Html All Code
function HtmlNav(section) {
    return `<a href="#${ section.id }" class="menu__link ${ section.dataset.nav }" data-nav="${ section.id }">${ section.dataset.nav }</a>`
}

function HtmlSection () {
    return `<div class="landing__container">
        <h2>Section ${ sections.length + 1 }</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec non diam euismod, vestibulum nisl non, ultrices augue. Sed id lectus in nunc tincidunt ultrices. Donec euismod, nisl nec consectetur tincidunt, ligula dolor aliquam enim, nec ultrices nunc turpis eu nunc. Sed auctor, nisl vitae molestie ultrices, nisl lacus ultrices nulla, eget ultricies libero odio at sem. Suspendisse potenti. Donec auctor, dolor sit amet aliquam eleifend, augue libero aliquam nisl, sed tincidunt risus nunc nec nisl. Nulla facilisi. Sed sed massa euismod, ultrices massa sit amet, faucibus nunc. Sed a nunc auctor, aliquam nisl vitae, aliquam nunc. Sed auctor, nisl vitae molestie ultrices, nisl lacus ultrices nulla, eget ultricies libero odio at sem. Suspendisse potenti. Donec auctor, dolor sit amet aliquam eleifend, augue libero aliquam nisl, sed tincidunt risus nunc nec nisl. Nulla facilisi. Sed sed massa euismod, ultrices massa sit amet, faucibus nunc. Sed a nunc auctor, aliquam nisl vitae, aliquam nunc.</p>
        </div>`
}

/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

// build the nav
function buildNav () {
    sections.forEach ( section => {
        const navItem = document.createElement ( 'li' );
        navItem.innerHTML = HtmlNav(section);
        Scroll.appendChild ( navItem );
    } );
    navBar.appendChild ( Scroll );
    //scroll Nav
    scrollNav ()
    // nav bar active state on scroll and click
    window.addEventListener ( 'scroll' , () => {
        sections.forEach ( section => {
            if ( ViewPort ( section ) ) {
                const activeLink = document.querySelector ( `[data-nav=${ section.id }]` );
                activeLink.classList.add ( 'BtnActive' );
            } else {
                const activeLink = document.querySelector ( `[data-nav=${ section.id }]` );
                activeLink.classList.remove ( 'BtnActive' );
            }
        } );
    } )
}

//scroll Nav
function scrollNav () {
    navBar.addEventListener ( 'click' , ( e ) => {
        e.preventDefault ();
        const section = document.getElementById ( e.target.dataset.nav );
        section.scrollIntoView ( { behavior : "smooth" } );
    } );
}

// Scroll to top button
function scrollToTop () {
    Top.addEventListener ( 'click' , () => {
        window.scrollTo ( { top : 0 , behavior : "smooth" } );
    } );
    window.addEventListener ( 'scroll' , () => {
        if ( window.scrollY > 300 ) {
            Top.style.display = 'block';
        } else {
            Top.style.display = 'none';
        }
    } );
}

// Add new section to the page
function addNewSection () {
    AddNew.addEventListener ( 'click' , () => {
        sections = document.querySelectorAll ( 'section' );
        const newSection = document.createElement ( 'section' );
        newSection.setAttribute ( 'data-nav' , 'Section ' + ( sections.length + 1 ) );
        newSection.setAttribute ( 'id' , 'section' + ( sections.length + 1 ) );
        newSection.innerHTML = HtmlSection();
        document.querySelector ( 'main' ).appendChild ( newSection );
        AddNavItem(newSection);
    } );
}


//Add NavBar Item
function AddNavItem(newSection) {
    const navItem = document.createElement ( 'li' );
    navItem.innerHTML = `<a href="#${ newSection.id }" class="menu__link ${ newSection.dataset.nav }" data-nav="${ newSection.id }">${ newSection.dataset.nav }</a>`;
    navBar.appendChild ( navItem );
}

/**
 * End Main Functions
 * Begin Events
 *
 */

// Build menu
buildNav ();
// Scroll to top button
scrollToTop ();
// Add new section
addNewSection ();