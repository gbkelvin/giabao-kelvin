import { collection }   from "firebase/firestore";
import { database }     from "./FirebaseConfig";

export const SLIDER_COLLECTION              = collection( database, 'slidersCollection'  );
export const CONTACT_CONSULTANT_COLLECTION  = collection( database, 'contactConsultant'  );
export const NEWSLETTER_COLLECTION          = collection( database, 'newSletterEmail'    );
export const PROJECTS_COLLECTION            = collection( database, 'projectsCollection' );
export const SERVICES_COLLECTION            = collection( database, "servicesCollection" );
export const BLOGS_COLLECTION               = collection( database, "blogsCollection"    );
export const ABOUT_US_COLLECTION            = collection( database, "aboutUsCollection"  );
export const COMPANY_COLLECTION             = collection( database, "companyCollection"  );

/*Condition collection*/