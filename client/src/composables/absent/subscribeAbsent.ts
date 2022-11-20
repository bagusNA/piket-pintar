import { pb } from "@/pocketbase";
import type { Ref } from "vue";
import type { Record } from "pocketbase";

export function subscribeAbsent(records: Ref<Record[]>) {
    pb.collection('absents').subscribe('*', async function (e) {
        if (e.action !== 'create') return;

        const record = await pb.collection('absents').getOne(e.record.id, {
            expand: 'student_id.school_class_id.specialty_id,student_id.user_id'
        });

        records.value.unshift(record);
    });
}