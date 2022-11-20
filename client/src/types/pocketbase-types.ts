/**
* This file was @generated using pocketbase-typegen
*/

export enum Collections {
	Absents = "absents",
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

// Alias types for improved usability
export type IsoDateString = string
export type RecordIdString = string

// System fields
export type BaseSystemFields = {
	id: RecordIdString
	created: IsoDateString
	updated: IsoDateString
	collectionId: string
	collectionName: Collections
	expand?: { [key: string]: any }
}

export type AuthSystemFields = {
	email: string
	emailVisibility: boolean
	username: string
	verified: boolean
} & BaseSystemFields

// Record types for each collection

export type AbsentsRecord = {
	student_id: RecordIdString
	time_arrived: IsoDateString
	description?: string
}

export type DispensationsRecord = {
	student_id: RecordIdString
	teacher_id: RecordIdString
	description?: string
	time_start?: IsoDateString
	time_end?: IsoDateString
}

export type ParentsRecord = {
	user_id: RecordIdString
	student_id: RecordIdString
	name: string
	phone_number?: string
}

export type PicketSchedulesRecord = {
	picket_session_id: RecordIdString
	teacher_id: RecordIdString
}

export enum PicketSessionsDayOptions {
	Mon = "Mon",
	Tue = "Tue",
	Wed = "Wed",
	Thu = "Thu",
	Fri = "Fri",
	Sat = "Sat",
	Sun = "Sun",
}
export type PicketSessionsRecord = {
	day: PicketSessionsDayOptions
	time_start: string
	time_end: string
}

export type RolesRecord = {
	name: string
}

export enum SchoolClassesGradeOptions {
	X = "X",
	XI = "XI",
	XII = "XII",
}
export type SchoolClassesRecord = {
	grade: SchoolClassesGradeOptions
	specialty_id: RecordIdString
	number: number
	teacher_id?: RecordIdString
}

export type SchoolYearsRecord = {
	year_start: number
	year_end: number
}

export type SpecialtiesRecord = {
	name: string
	initial?: string
	desc?: string
}

export enum StudentsGenderOptions {
	Male = "Male",
	Female = "Female",
}
export type StudentsRecord = {
	user_id: RecordIdString
	gender: StudentsGenderOptions
	school_class_id: RecordIdString
	name: string
}

export type TeachersRecord = {
	user_id: RecordIdString
	name: string
}

export type UsersRecord = {
	avatar?: string
	role_id: RecordIdString
}

// Response types include system fields and match responses from the PocketBase API
export type AbsentsResponse = AbsentsRecord & BaseSystemFields
export type DispensationsResponse = DispensationsRecord & BaseSystemFields
export type ParentsResponse = ParentsRecord & BaseSystemFields
export type PicketSchedulesResponse = PicketSchedulesRecord & BaseSystemFields
export type PicketSessionsResponse = PicketSessionsRecord & BaseSystemFields
export type RolesResponse = RolesRecord & BaseSystemFields
export type SchoolClassesResponse = SchoolClassesRecord & BaseSystemFields
export type SchoolYearsResponse = SchoolYearsRecord & BaseSystemFields
export type SpecialtiesResponse = SpecialtiesRecord & BaseSystemFields
export type StudentsResponse = StudentsRecord & BaseSystemFields
export type TeachersResponse = TeachersRecord & BaseSystemFields
export type UsersResponse = UsersRecord & AuthSystemFields

export type CollectionRecords = {
	absents: AbsentsRecord
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