import { getLocalStorageWithoutParsing } from '@/utils/local-storage';
import { STORAGE_KEY } from '@/constants';
import { ReplyMagazineApiFetch } from '@/utils/fetch-API';
import axios from 'axios';

const access_token = getLocalStorageWithoutParsing(STORAGE_KEY.ACCESS_TOKEN);
const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT;

export const createUser = async (fullName: string, email: string, password: string, type: string) => {
  try {
    const response = await axios.post(
      `${API_ENDPOINT}/api/public/user/new-user`,
      {
        fullName,
        email,
        password,
        type
      },
    );
    return response.data;
  } catch (e) {
    return null;
  }
};

export const createProject = async (projectName:string, website:string, description:string, proposition:string, customer:string, instructions:string, painPoint:string) => {
  try {
    const response = await ReplyMagazineApiFetch(
      `${API_ENDPOINT}/api/private/project/create-project`,
      {
        projectName,
        website,
        description,
        proposition,
        customer,
        instructions,
        painPoint
      },
      'POST',
    );
    return response.data;
  } catch (_error) {
    return false;
  }
};



export const saveArticle = async (_id : string, keyword: string, text: string) => {
  try {
    const response = await ReplyMagazineApiFetch(
      `${API_ENDPOINT}/api/private/mention/save-mention`,
      {
        _id, keyword, text
      },
      'POST',
    );
    return response;
  } catch (_error) {
    return false;
  }
};

export const deleteProject = async (_id : string) => {
  try {
    const response = await ReplyMagazineApiFetch(
      `${API_ENDPOINT}/api/private/project/delete-project`,
      {
        _id
      },
      'POST',
    );
    return response;
  } catch (_error) {
    return false;
  }
};


export const editArticle = async (_id : string, keyword: string) => {
  try {
    const response = await ReplyMagazineApiFetch(
      `${API_ENDPOINT}/api/private/mention/edit-mention`,
      {
        _id, keyword
      },
      'POST',
    );
    return response;
  } catch (_error) {
    return false;
  }
};

export const publishArticle = async (_id : string, keyword: string) => {
  try {
    const response = await ReplyMagazineApiFetch(
      `${API_ENDPOINT}/api/private/mention/publish-mention`,
      {
        _id, keyword
      },
      'POST',
    );
    return response;
  } catch (_error) {
    return false;
  }
};

export const confirmMail = async (_id : string, code: string) => {
  try {
    const response = await ReplyMagazineApiFetch(
      `${API_ENDPOINT}/api/public/user/confirm-mail`,
      {
        _id, code
      },
      'POST',
    );
    return response;
  } catch (_error) {
    return false;
  }
};

export const removeArticle = async (_id : string, keyword: string) => {
  try {
    const response = await ReplyMagazineApiFetch(
      `${API_ENDPOINT}/api/private/mention/remove-mention`,
      {
        _id, keyword
      },
      'POST',
    );
    return response;
  } catch (_error) {
    return false;
  }
};

export const deleteArticle = async (_id : string, keyword: string) => {
  try {
    const response = await ReplyMagazineApiFetch(
      `${API_ENDPOINT}/api/private/mention/delete-mention`,
      {
        _id, keyword
      },
      'POST',
    );
    return response;
  } catch (_error) {
    return false;
  }
};

export const keywordDelete = async (_id : string) => {
  try {
    const response = await ReplyMagazineApiFetch(
      `${API_ENDPOINT}/api/private/keyword/delete-keyword`,
      {
        _id
      },
      'POST',
    );
    return response;
  } catch (_error) {
    return false;
  }
};

export const deleteNegativeKeyword = async (_id: string) => {
  try {
    const response = await ReplyMagazineApiFetch(
      `${API_ENDPOINT}/api/private/negative/delete-negative-keyword`,
      {
        _id
      },
      'POST',
    );
    return response;
  } catch (_error) {
    return false;
  }
};

export const getProjectDetails = async () => {
  try {
    const response = await ReplyMagazineApiFetch(`${API_ENDPOINT}/api/private/project/getData`);
    return response;
  } catch (_error) {
    return null;
  }
};

export const getKeywords = async () => {
  try {
    const response = await ReplyMagazineApiFetch(`${API_ENDPOINT}/api/private/keyword/getData`);
    return response;
  } catch (_error) {
    return null;
  }
};

export const getMentions = async (keyword: string) => {
  try {
    const response = await ReplyMagazineApiFetch(
      `${API_ENDPOINT}/api/private/mention/getData`,
      {
        keyword,
      },
      'POST',
    );
    return response;
  } catch (_error) {
    return null;
  }
};

export const generateAIContext = async (_id:string, title:string, userId:string, selftext:string, keyword:string) => {
  try {
    const response = await ReplyMagazineApiFetch(
      `${API_ENDPOINT}/api/private/mention/generateContext`,
      {
        _id, title, userId, selftext, keyword,
      },
      'POST',
    );
    return response;
  } catch (_error) {
    return null;
  }
};



export const getNegativeKeywords = async () => {
  try {
    const response = await ReplyMagazineApiFetch(`${API_ENDPOINT}/api/private/negative/getData`);
    return response;
  } catch (_error) {
    return null;
  }
};

export const createKeyword = async (_id:string, keyword:string, mention:string, reply:string) => {
  try {
    const response = await ReplyMagazineApiFetch(
      `${API_ENDPOINT}/api/private/keyword/create-keyword`,
      {
        _id,
        keyword,
        mention,
        reply,
      },
      'POST',
    );
    return response.data;
  } catch (_error) {
    return false;
  }
};

export const createNegativeKeyword = async (_id:string, negativeKeyword:string) => {
  try {
    const response = await ReplyMagazineApiFetch(
      `${API_ENDPOINT}/api/private/negative/create-negative-keyword`,
      {
        _id,
        negativeKeyword,
      },
      'POST',
    );
    return response.data;
  } catch (_error) {
    return false;
  }
};

export const sign = async (email: string, password: string) => {
  try {
    const response = await axios.post(
      `${API_ENDPOINT}/api/public/user/sign-in`,
      {
        email,
        password
      },
    );
    return response.data;
  } catch (e) {
    return '';
  }
};

export const forgotPassword = async (email: string) => {
  try {
    const response = await axios.post(
      `${API_ENDPOINT}/api/public/user/forgotPassword`,
      {
        email
      },
    );
    return response.data;
  } catch (e) {
    return null;
  }
};

export const verifyEmail = async (mail: string, code: string) => {
  try {
    const response = await axios.post(
      `${API_ENDPOINT}/api/public/user/verifyEmail`,
      {
        mail,
        code
      },
    );
    return response.data;
  } catch (e) {
    return '';
  }
};

export const confirmForgetPasswordLink = async (_id: string, secret: string) => {
  try {
    const response = await axios.post(
      `${API_ENDPOINT}/api/public/user/confirmForgetLink`,
      {
        _id,
        secret
      },
    );
    return response.data;
  } catch (e) {
    return '';
  }
};

export const upgradePassword = async (_id: string, password: string) => {
  try {
    const response = await axios.post(
      `${API_ENDPOINT}/api/public/user/upgradePassword`,
      {
        _id,
        password
      },
    );
    return response.data;
  } catch (e) {
    return '';
  }
};
