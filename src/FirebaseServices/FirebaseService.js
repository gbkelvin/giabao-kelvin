import { async } from "@firebase/util";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { database } from "./FirebaseConfig";
import * as FB_COLLECTION from "./firebaseContext";
import { v4 as uuidv4 } from "uuid";

export const getVideoDocument = async () => {
  console.log(">--Get video background from Firestore-->");
  const getVideoDocs = await getDocs(FB_COLLECTION.VIDEO_COLLECTION);
  const getVideoList = getVideoDocs.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  return getVideoList;
};

export const getIntroductionDocument = async (langType) => {
  console.log(">--Get introduction from Firestore-->");
  const getIntroDocs = await getDocs(FB_COLLECTION.INTRODUCTION_COLLECTION);
  const getIntroList = getIntroDocs.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));

  let IntroItem = {};
  IntroItem = IntroItem || {};
  IntroItem.id = getIntroList[0].id;
  IntroItem.intro_image = getIntroList[0].intro_image;

  switch (langType) {
    case "vn":
      IntroItem.intro_title = getIntroList[0].vn_intro.intro_title;
      IntroItem.intro_description = getIntroList[0].vn_intro.intro_description;
      IntroItem.intro_footer = getIntroList[0].vn_intro.intro_footer;
      break;
    case "en":
      IntroItem.intro_content = getIntroList[0].en_intro.intro_title;
      IntroItem.intro_description = getIntroList[0].en_intro.intro_description;
      IntroItem.intro_footer = getIntroList[0].en_intro.intro_footer;
      break;
    default:
      break;
  }
  return IntroItem;
};

export const getServicesDocument = async (langType) => {
  console.log("--Get Services Collection from Firestore--");
  const servicesDocs = await getDocs(FB_COLLECTION.SERVICES_COLLECTION);
  const servicesData = servicesDocs.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  var servicesList = [];

  for (let idx = 0; idx < servicesData.length; idx++) {
    var serviceItem = {};
    serviceItem.id = servicesData[idx].id;
    serviceItem.iconService = servicesData[idx].iconService;
    serviceItem.typeService = servicesData[idx].typeService;
    serviceItem.urlService = servicesData[idx].urlService;
    serviceItem.avtService = servicesData[idx].imgProcessService;
    switch (langType) {
      case "vn":
        serviceItem.serviceName = servicesData[idx].vnService.serviceName;
        serviceItem.serviceIntro = servicesData[idx].vnService.serviceIntro;
        break;
      case "en":
        serviceItem.serviceName = servicesData[idx].enService.serviceName;
        serviceItem.serviceIntro = servicesData[idx].enService.serviceIntro;
        break;
      default:
        serviceItem.serviceName = servicesData[idx].vnService.serviceName;
        serviceItem.serviceIntro = servicesData[idx].vnService.serviceIntro;
        break;
    }
    servicesList.push(serviceItem);
  }
  return servicesList;
};

export const getServiceByID = async (props, langType) => {
  console.log("--Get Service Item from Firestore--");
  const servicesDocs = await getDocs(FB_COLLECTION.SERVICES_COLLECTION);
  const servicesData = servicesDocs.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));

  var getServiceItemByLang = servicesData.find(
    (item) => item.id === props.serDocumentID
  );
  var serviceItem = serviceItem || {};
  var genID = uuidv4().slice(0, 8);
  switch (langType) {
    case "vn":
      serviceItem.id_service = genID;
      serviceItem.bgr_service = getServiceItemByLang.bgrService;
      serviceItem.img_process_service = getServiceItemByLang.imgProcessService;
      serviceItem.service_name = getServiceItemByLang.vnService.serviceName;
      serviceItem.service_title = getServiceItemByLang.vnService.serviceTitle;
      serviceItem.service_detail = getServiceItemByLang.vnService.serviceItem;
      serviceItem.service_process =
        getServiceItemByLang.vnService.serviceProcess;
      break;
    case "en":
      serviceItem.id_service = genID;
      serviceItem.bgr_service = getServiceItemByLang.bgrService;
      serviceItem.img_process_service = getServiceItemByLang.imgProcessService;
      serviceItem.service_name = getServiceItemByLang.enService.serviceName;
      serviceItem.service_title = getServiceItemByLang.enService.serviceTitle;
      serviceItem.service_detail = getServiceItemByLang.enService.serviceItem;
      serviceItem.service_process =
        getServiceItemByLang.enService.serviceProcess;
      break;
    default:
      serviceItem.id_service = genID;
      serviceItem.bgr_service = getServiceItemByLang.bgrService;
      serviceItem.img_process_service = getServiceItemByLang.imgProcessService;
      serviceItem.service_name = getServiceItemByLang.vnService.serviceName;
      serviceItem.service_title = getServiceItemByLang.vnService.serviceTitle;
      serviceItem.service_detail = getServiceItemByLang.vnService.serviceItem;
      serviceItem.service_process =
        getServiceItemByLang.vnService.serviceProcess;
      break;
  }
  return serviceItem;
};

export const getClientDocument = async () => {
  console.log("--Get client from Firestore--");
  const clientDocs = await getDocs(FB_COLLECTION.CLIENT_COLLECTION);
  const clientData = clientDocs.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  return clientData;
};

export const getCompanyInformation = async (langType) => {
  console.log("--Get company information from Firestore--");
  const companyDocs = await getDocs(FB_COLLECTION.COMPANY_COLLECTION);
  const companyData = companyDocs.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  const companyInfoItem = companyData.find(
    (item) => item.id === "ZdlU4ylZRxeoPTlnMg4D"
  );

  var companyInfoByLang = {};
  switch (langType) {
    case "vn":
      companyInfoByLang.companyName = companyInfoItem.companyName.vnCompName;
      companyInfoByLang.companyBusiness =
        companyInfoItem.companyBusiness.vnCompBusiness;
      companyInfoByLang.companyIntroduction =
        companyInfoItem.companyIntroduction.vnCompIntro;
      companyInfoByLang.companyEmail = companyInfoItem.companyEmail;
      companyInfoByLang.companyPhone = companyInfoItem.companyPhone;
      companyInfoByLang.companyAddress =
        companyInfoItem.companyAddress.vnCompAddress;
      companyInfoByLang.openTime = companyInfoItem.openTime;
      break;
    case "en":
      companyInfoByLang.companyName = companyInfoItem.companyName.enCompName;
      companyInfoByLang.companyBusiness =
        companyInfoItem.companyBusiness.enCompBusiness;
      companyInfoByLang.companyIntroduction =
        companyInfoItem.companyIntroduction.enCompIntro;
      companyInfoByLang.companyEmail = companyInfoItem.companyEmail;
      companyInfoByLang.companyPhone = companyInfoItem.companyPhone;
      companyInfoByLang.companyAddress =
        companyInfoItem.companyAddress.enCompAddress;
      companyInfoByLang.openTime = companyInfoItem.openTime;
      break;

    default:
      break;
  }
  return companyInfoByLang;
};

export const getAboutUs = async (langType) => {
  console.log("--Get About Us Collection from Firestore--");
  const aboutUsDocs = await getDocs(FB_COLLECTION.ABOUT_US_COLLECTION);
  const aboutUsData = aboutUsDocs.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));

  const aboutUsInfoItem = aboutUsData.find(
    (item) => item.id === "5dLtfrHfDpLPyetHDJuK"
  );

  var aboutUsInfoByLang = {};
  aboutUsInfoByLang.docID = aboutUsInfoItem.id;
  switch (langType) {
    case "vn":
      aboutUsInfoByLang.aboutUsImage = aboutUsInfoItem.aboutUsImage;
      aboutUsInfoByLang.aboutUsIntro =
        aboutUsInfoItem.aboutUsIntro.vnAboutUsIntro;
      break;
    case "en":
      aboutUsInfoByLang.aboutUsImage = aboutUsInfoItem.aboutUsImage;
      aboutUsInfoByLang.aboutUsIntro =
        aboutUsInfoItem.aboutUsIntro.enAboutUsIntro;
      break;

    default:
      break;
  }
  return aboutUsInfoByLang;
};

export const getTopicAboutUs = async (langType) => {
  console.log("--Get Topic About Us Collection from Firebase--");
  const aboutUsDocs = await getDocs(FB_COLLECTION.ABOUT_US_COLLECTION);
  const aboutUsData = aboutUsDocs.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));

  const aboutUsInfoItem = aboutUsData.find(
    (item) => item.id === "5dLtfrHfDpLPyetHDJuK"
  );
  const aboutUsTopicData = aboutUsInfoItem.aboutUsTopic;

  var tempTopicArr = [];
  for (let idx = 0; idx < aboutUsTopicData.length; idx++) {
    let tempTopicObj = {};

    switch (langType) {
      case "vn":
        tempTopicObj.topicImage = aboutUsTopicData[idx].auTopicImage;
        tempTopicObj.topicTitle =
          aboutUsTopicData[idx].auTopicTitle.vnTopicTitle;
        tempTopicObj.topicContent =
          aboutUsTopicData[idx].auTopicContent.vnTopicContent;
        break;
      case "en":
        tempTopicObj.topicImage = aboutUsTopicData[idx].auTopicImage;
        tempTopicObj.topicTitle =
          aboutUsTopicData[idx].auTopicTitle.enTopicTitle;
        tempTopicObj.topicContent =
          aboutUsTopicData[idx].auTopicContent.enTopicContent;
        break;
      default:
        break;
    }
    tempTopicArr.push(tempTopicObj);
  }
  return tempTopicArr;
};

export const getProjectDocument = async (projectType, langType) => {
  console.log("--Get Projects Collection from Firestore--");
  const projectsDocs = await getDocs(FB_COLLECTION.PROJECTS_COLLECTION);
  const projectsData = projectsDocs.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  var projectsList = [];
  for (let idx = 0; idx < projectsData.length; idx++) {
    var projectItem = {};
    projectItem.id = projectsData[idx].id;
    projectItem.avtProject = projectsData[idx].project_avt;
    projectItem.typeProject = projectsData[idx].project_type;
    projectItem.urlProject = projectsData[idx].project_url;
    projectItem.bgrProject = projectsData[idx].project_bgr;
    switch (langType) {
      case "vn":
        projectItem.nameProject =
          projectsData[idx].project_name.vn_project_name;
        break;
      case "en":
        projectItem.nameProject =
          projectsData[idx].project_name.en_project_name;
        break;
      default:
        projectItem.nameProject =
          projectsData[idx].project_name.vn_project_name;
        break;
    }
    projectsList.push(projectItem);
  }

  if (
    projectType === undefined ||
    projectType === "" ||
    projectType.length <= 0
  ) {
    return projectsList;
  } else {
    return projectsList.filter((item) => item.typeProject === projectType);
  }
};

export const getProjectByID = async (projectID, langType) => {
  console.log("--Get Projects Item from Firestore--");

  const projectsDocs = await getDocs(FB_COLLECTION.PROJECTS_COLLECTION);
  const projectsData = projectsDocs.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));

  const getProjectById = projectsData.find(
    (item) => item.id === projectID
  );

  switch (langType) {
    case "vn":
      getProjectById.project_name = getProjectById.project_name.vn_project_name;
      getProjectById.project_description =
        getProjectById.project_description.vn_project_description;
      getProjectById.project_item.forEach((proItem, index) => {
        let tempItem = {};
        tempItem.project_item_image = proItem.project_item_image;
        tempItem.project_item_name = proItem.vn_project_item.project_item_name;
        tempItem.project_item_title =
          proItem.vn_project_item.project_item_title;
        getProjectById.project_item[index] = tempItem;
      });
      break;
    case "en":
      getProjectById.project_name = getProjectById.project_name.en_project_name;
      getProjectById.project_description =
        getProjectById.project_description.en_project_description;
      getProjectById.project_item.forEach((proItem, index) => {
        let tempItem = {};
        tempItem.project_item_image = proItem.project_item_image;
        tempItem.project_item_name = proItem.en_project_item.project_item_name;
        tempItem.project_item_title =
          proItem.en_project_item.project_item_title;
        getProjectById.project_item[index] = tempItem;
      });
      break;
    default:
      getProjectById.project_name = getProjectById.project_name.vn_project_name;
      getProjectById.project_description =
        getProjectById.project_description.vn_project_description;
      getProjectById.project_item.forEach((proItem, index) => {
        let tempItem = {};
        tempItem.project_item_image = proItem.project_item_image;
        tempItem.project_item_name = proItem.vn_project_item.project_item_name;
        tempItem.project_item_title =
          proItem.vn_project_item.project_item_title;
        getProjectById.project_item[index] = tempItem;
      });
      break;
  }
  return getProjectById;
};

export const getBlogs = async (blogType, langType) => {
  console.log("--Get Blogs Collection from Firestore--");
  const blogsDocs = await getDocs(FB_COLLECTION.BLOGS_COLLECTION);
  const blogsData = blogsDocs.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));

  for (let idx = 0; idx < blogsData.length; idx++) {
    switch (langType) {
      case "vn":
        blogsData[idx].blogName = blogsData[idx].blogName.vnBlogName;
        break;
      case "en":
        blogsData[idx].blogName = blogsData[idx].blogName.enBlogName;
        break;
      default:
        blogsData[idx].blogName = blogsData[idx].blogName.vnBlogName;
        break;
    }
  }

  if (blogType === undefined || blogType === "" || blogType.length <= 0) {
    return blogsData;
  } else {
    return blogsData.filter((item) => item.blogType === blogType);
  }
};

export const getArticleByID = async (props, langType) => {
  console.log("--Get Article Item from Firestore--");
  const blogsDocs = await getDocs(FB_COLLECTION.BLOGS_COLLECTION);
  const blogsData = blogsDocs.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));

  var getArticleItemByLang = blogsData.find(
    (item) => item.id === props.blogDocumentID
  );
  var artDetailTempArr = [];
  switch (langType) {
    case "vn":
      getArticleItemByLang.blogName = getArticleItemByLang.blogName.vnBlogName;
      getArticleItemByLang.articleList.forEach((element) => {
        let articleItem = {};
        articleItem.articleTitle = element.articleTitle.vnTitle;
        articleItem.articleContent = element.articleContent.vnContent;

        artDetailTempArr.push(articleItem);
      });
      getArticleItemByLang.articleList = artDetailTempArr;
      break;
    case "en":
      getArticleItemByLang.blogName = getArticleItemByLang.blogName.enBlogName;
      getArticleItemByLang.articleList.forEach((element) => {
        let articleItem = {};
        articleItem.articleTitle = element.articleTitle.enTitle;
        articleItem.articleContent = element.articleContent.enContent;

        artDetailTempArr.push(articleItem);
      });
      getArticleItemByLang.articleList = artDetailTempArr;
      break;
    default:
      getArticleItemByLang.blogName = getArticleItemByLang.blogName.vnBlogName;
      getArticleItemByLang.articleList.forEach((element) => {
        let articleItem = {};
        articleItem.articleTitle = element.articleTitle.vnTitle;
        articleItem.articleContent = element.articleContent.vnContent;

        artDetailTempArr.push(articleItem);
      });
      getArticleItemByLang.articleList = artDetailTempArr;
      break;
  }
  return getArticleItemByLang;
};

export const getNewSletterEmails = async () => {
  const newSletterEmailsDoc = await getDocs(
    FB_COLLECTION.NEWSLETTER_COLLECTION
  );
  const newSletterData = newSletterEmailsDoc.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  return newSletterData;
};

export const getNewSletterEmailByEmail = async (inputEmail) => {
  const newSletterEmailsDoc = await getDocs(
    FB_COLLECTION.NEWSLETTER_COLLECTION
  );
  const newSletterData = newSletterEmailsDoc.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  const newSletterResult = newSletterData.find(
    (item) => item.newSletterEmail === inputEmail
  );

  if (newSletterResult !== undefined) {
    return newSletterResult.newSletterEmail;
  } else {
    return undefined;
  }
};

export const postNewSletterEmail = async (newSletterObject) => {
  var newDate = new Date();
  var formatDate = `${newDate.getFullYear()}-${
    newDate.getMonth() + 1
  }-${newDate.getDate()}`;
  var formatTime = `${newDate.getHours()}:${newDate.getMinutes()}:${newDate.getSeconds()}`;
  const currDate = `${formatDate}   ${formatTime}`;
  newSletterObject.timeCreateEmail = currDate;

  const sendNewSletterEmail = doc(FB_COLLECTION.NEWSLETTER_COLLECTION);
  //add newsletter email into newsletter collection
  await setDoc(sendNewSletterEmail, newSletterObject);

  return newSletterObject;
};

export const postContactConsultant = async (
  customerInfo,
  supportContent,
  customerID
) => {
  var newDate = new Date();
  var formatDate = `${newDate.getFullYear()}-${
    newDate.getMonth() + 1
  }-${newDate.getDate()}`;
  var formatTime = `${newDate.getHours()}:${newDate.getMinutes()}:${newDate.getSeconds()}`;
  const currDate = `${formatDate}   ${formatTime}`;
  supportContent.requestTime = currDate;

  const contactConsultantDoc = await getDocs(
    FB_COLLECTION.CONTACT_CONSULTANT_COLLECTION
  );
  const contactConsultantData = contactConsultantDoc.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));

  const checkCustomerID = contactConsultantData.find(
    (item) => item.id === customerID
  );

  const SUPPORT_CONTENT_URL = `contactConsultant/${customerID}/supportContent`;
  const SUPPORT_CONTENT_COL = collection(database, SUPPORT_CONTENT_URL);

  if (checkCustomerID === undefined) {
    /*if email is not exits */
    console.log(`${customerID} is not exist`);

    const newCustomerContactID = doc(database, "contactConsultant", customerID);
    const newSupportContent = doc(SUPPORT_CONTENT_COL);

    await setDoc(newCustomerContactID, customerInfo);
    await setDoc(newSupportContent, supportContent);

    return `Created new customer contact with ID: ${customerID} and firs supportContent document ID: ${newSupportContent.id}`;
  } else {
    /*if email is exits */
    console.log(`${customerID} is existed`);

    const newSpContentCol = collection(database, SUPPORT_CONTENT_URL);
    const newSupportContent = doc(newSpContentCol);

    await setDoc(newSupportContent, supportContent);
    return `create new supportContent Document ID: ${newSupportContent.id} in customer contact ID: ${customerID}`;
  }
};
