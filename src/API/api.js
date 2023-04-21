import axios from "axios";

const instance = axios.create({
  withCredentials: true,
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  headers: {
    "API-KEY": "ad6e658f-ef44-44e2-a4a1-dc258b77e9e7",
  },
});

export const usersAPI = {
  async getUsers(currentPage, pageSize) {
    const response = await instance.get(
      `users?page=${currentPage}&count=${pageSize}`
    );
    return response.data;
  },
  async setFollow(id) {
    const response = await instance.post(`follow/${id}`);
    return response.data;
  },
  async setUnFollow(id) {
    const response = await instance.delete(`follow/${id}`);
    return response.data;
  },
};

export const profileAPI = {
  async getProfile(id) {
    const response = await instance.get("profile/" + id);
    return response.data;
  },
  async getStatus(id = 2) {
    const response = await instance.get(`profile/status/${id}`);
    return response.data;
  },
  async updateStatus(status) {
    const response = await instance.put("profile/status", { status });
    return response.data;
  },
  async savePhoto(photos) {
    const formData = new FormData();
    formData.append("image", photos);
    const response = await instance.put("profile/photo", formData, {
      headers: {
        "Content-type": "multipart/form-data",
      },
    });
    return response.data;
  },
  async saveProfile(profile) {
    const response = await instance.put("profile", profile);
    return response.data;
  },
};

export const authAPI = {
  async getLogin() {
    const response = await instance.get("auth/me");
    return response.data;
  },
  async loginMe(email, password, rememberMe = false, captcha = null) {
    const response = await instance.post("auth/login", {
      email,
      password,
      rememberMe,
      captcha,
    });
    return response.data;
  },
  async logOut() {
    const response = await instance.delete("auth/login");
    return response.data;
  },
};

export const securityAPI = {
  async getCaptcha() {
    const response = await instance.get("security/get-captcha-url");
    return response.data;
  },
};
