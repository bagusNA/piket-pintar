import { pb } from "@/pocketbase"

export async function getAllAbsents(page: number = 1) {
  const absents = await
    pb.collection('absents').getList(page, 20, {
      sort: '-time_arrived',
      expand: 'student_id.school_class_id.specialty_id,student_id.user_id',
    });

  return absents.items;
}