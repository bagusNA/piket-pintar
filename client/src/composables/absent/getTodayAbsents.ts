import { pb } from "@/pocketbase"
import { useDateFormat, useNow } from "@vueuse/core";

const date = useNow();
const todayDate = useDateFormat(date, "YYYY-MM-DD");

export async function getTodayAbsents() {
  const absents = await
    pb.collection('absents').getList(1, 20, {
      filter: `created >= "${todayDate.value} 00:00:00"`,
      sort: '-time_arrived',
      expand: 'student_id.school_class_id.specialty_id,student_id.user_id'
    });

  return absents.items;
}