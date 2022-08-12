import { collection }   from "firebase/firestore";
import { database }     from "./FirebaseConfig";

export const CONTACT_CONSULTANT_COLLECTION  = collection( database, 'contactConsultant'  );
export const NEWSLETTER_COLLECTION          = collection( database, 'newSletterEmail'    );
export const PROJECTS_COLLECTION            = collection( database, 'projectsCollection' );
// export const SERVICES_COLLECTION            = collection( database, "ServicesCollection" );
export const BLOGS_COLLECTION               = collection( database, "blogsCollection"    );
export const ABOUT_US_COLLECTION            = collection( database, "aboutUsCollection"  );
export const COMPANY_COLLECTION             = collection( database, "companyCollection"  );

export const VIDEO_COLLECTION               = collection( database, "VideoCollection"    );
export const INTRODUCTION_COLLECTION        = collection( database, "IntroCollection"    );
export const SERVICES_COLLECTION            = collection( database, "ServiceCollection"  );
export const CLIENT_COLLECTION              = collection( database, "ClientCollection"   );

/*Condition collection*/