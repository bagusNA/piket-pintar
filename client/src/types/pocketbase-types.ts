// This file was @generated using pocketbase-typegen

export type IsoDateString = string

export type RecordIdString = string

export type UserIdString = string

export type BaseRecord = {
	id: RecordIdString
	created: IsoDateString
	updated: IsoDateString
	"@collectionId": string
	"@collectionName": string
	"@expand"?: { [key: string]: any }
}

export enum Collections {
	Absentees = "absentees",
	Dispensations = "dispensations",
	Parents = "parents",
	PicketSchedules = "picket_schedules",
	PicketSessions = "picket_sessions",
	Roles = "roles",
	SchoolClasses = "school_classes",
	SchoolYears = "school_years",
	Specialties = "specialties",
	Students = "students",
	Teachers = "teachers",
	Users = "users",
}

export type AbsenteesRecord = {
	student_id: RecordIdString
	time_arrived: IsoDateString
	description?: string
}

export type AbsenteesResponse = AbsenteesRecord & BaseRecord

export type DispensationsRecord = {
	student_id: RecordIdString
	teacher_id: RecordIdString
	description?: string
	time_start?: IsoDateString
	time_end?: IsoDateString
}

export type DispensationsResponse = DispensationsRecord & BaseRecord

export type ParentsRecord = {
	user_id: RecordIdString
	student_id: RecordIdString
	name: string
	phone_number?: string
}

export type ParentsResponse = ParentsRecord & BaseRecord

export type PicketSchedulesRecord = {
	picket_session_id: RecordIdString
	teacher_id: RecordIdString
}

export type PicketSchedulesResponse = PicketSchedulesRecord & BaseRecord

export type PicketSessionsRecord = {
	day: "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun"
	time_start: IsoDateString
	time_end: IsoDateString
}

export type PicketSessionsResponse = PicketSessionsRecord & BaseRecord

export type RolesRecord = {
	name: string
}

export type RolesResponse = RolesRecord & BaseRecord

export type SchoolClassesRecord = {
	grade: "10" | "11" | "12"
	specialty_id: RecordIdString
	number: number
	teacher_id?: RecordIdString
}

export type SchoolClassesResponse = SchoolClassesRecord & BaseRecord

export type SchoolYearsRecord = {
	year_start: number
	year_end: number
}

export type SchoolYearsResponse = SchoolYearsRecord & BaseRecord

export type SpecialtiesRecord = {
	name: string
	initial?: string
	desc?: string
}

export type SpecialtiesResponse = SpecialtiesRecord & BaseRecord

export type StudentsRecord = {
	user_id: RecordIdString
	name: string
	gender: "Male" | "Female"
	school_class_id: RecordIdString
}

export type StudentsResponse = StudentsRecord & BaseRecord

export type TeachersRecord = {
	user_id: RecordIdString
}

export type TeachersResponse = TeachersRecord & BaseRecord

export type UsersRecord = {
	name?: string
	avatar?: string
	role_id: RecordIdString
}

export type UsersResponse = UsersRecord & BaseRecord

export type CollectionRecords = {
	absentees: AbsenteesRecord
	dispensations: DispensationsRecord
	parents: ParentsRecord
	picket_schedules: PicketSchedulesRecord
	picket_sessions: PicketSessionsRecord
	roles: RolesRecord
	school_classes: SchoolClassesRecord
	school_years: SchoolYearsRecord
	specialties: SpecialtiesRecord
	students: StudentsRecord
	teachers: TeachersRecord
	users: UsersRecord
}