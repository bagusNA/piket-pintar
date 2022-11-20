import { useAuthStore } from "@/stores/AuthStore";

export function getRole() {
    return useAuthStore().user.expand.role_id.name;
}