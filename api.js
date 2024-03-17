import axios from "axios";

const BASE_URL = "https://be-nc-news-p9rm.onrender.com/api";

export const fetchCommentsByArticleId = async (articleId) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/articles/${articleId}/comments`
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch comments");
  }
};

export const addComment = async (articleId, reqBody) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/articles/${articleId}/comments`,
      reqBody
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to post comment");
  }
};

export const deleteCommentById = async (commentId) => {
  try {
    const response = await axios.delete(`${BASE_URL}/comments/${commentId}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to delete comment");
  }
};

export const fetchTopics = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/topics`);
    return response.data.topics;
  } catch (error) {
    throw new Error("Failed to fetch topics");
  }
};

export const fetchUsers = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/users`);
    return response.data.users;
  } catch (error) {
    throw new Error("Failed to fetch users");
  }
};


export const fetchArticle = async (articleId) => {
  try {
    const response = await axios.get(`${BASE_URL}/articles/${articleId}`);
    return response.data.article[0];
  } catch (error) {
    throw new Error("Failed to fetch article");
  }
};

export const updateArticleVotes = async (article_id, reqBody) => {
  try {
    const response = await axios.patch(`${BASE_URL}/articles/${article_id}`, reqBody);
    return response.data.article;
  } catch (error) {
    throw new Error("Failed to update article votes");
  }
};

export const fetchArticles = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/articles`);
    return response.data.articles;
  } catch (error) {
    throw new Error("Failed to fetch articles");
  }
};


export const fetchSortedArticles = async (sortBy, order) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/articles/?sort_by=${sortBy}&order=${order}`
    );
    return response.data.articles;
  } catch (error) {
    throw new Error("Failed to fetch sorted articles");
  }
};