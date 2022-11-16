import { pb } from "@/pocketbase";

export async function getStudentByUserId(userId: string) {
  const record = await 
    pb.collection('students')
      .getFirstListItem(`user_id="${userId}"`);
    
  return record;
}