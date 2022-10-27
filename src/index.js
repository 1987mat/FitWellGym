import '../css/style.scss';

// Modules / Classes
import MobileMenu from './modules/MobileMenu';
import Search from './modules/Search';
import MyComments from './modules/MyComments';
import Like from './modules/Like';
import Navbar from './modules/NavbarScroll';
import ContactForm from './modules/ContactForm';

// Instantiate a new object using our modules/classes
const mobileMenu = new MobileMenu();
const search = new Search();
const myComments = new MyComments();
const likes = new Like();
const navbar = new Navbar();
const contactForm = new ContactForm();
