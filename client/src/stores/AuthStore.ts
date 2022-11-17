import { defineStore } from "pinia";
import { pb } from "@/pocketbase";
import { useStore } from "./Store";

interface AuthStore {
  token: string | null,
  user: any
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthStore => ({
    token: JSON.parse(localStorage.getItem('token')!) ?? null,
    user: JSON.parse(localStorage.getItem('user')!) ?? null,
  }),

  getters: {
    isAuth(): boolean {
      return !!(this.token && this.user);
    },
  },

  actions: {
    getAuthFromLocal() {
      this.token = JSON.parse(localStorage.getItem('token')!);
      this.user = JSON.parse(localStorage.getItem('user')!);
    },

    async login(username: string, password: string) {
      const store = useStore();
      let isError = false;

      try {
        const authData = await
            pb.collection('users')
              .authWithPassword(username, password, {}, {
                expand: 'role_id'
              });

        this.token = authData.token;
        this.user = authData.record;

        console.log(authData.record)

        localStorage.setItem('token', JSON.stringify(this.token));
        localStorage.setItem('user', JSON.stringify(this.user));
      }
      catch (e: any) {
        store.setError(e.message);
        isError = true;
      }

      return !isError;
    },

    async logout() {
      const store = useStore();

      pb.authStore.clear();

      store.setSuccess("Logout success!", 1000);

      this.token = null;
      this.user = null;
      
      localStorage.removeItem('token');
      localStorage.removeItem('user');

      return true;
    },
  }
});