export interface Address {
	id?: number;
	line1?: string;
	line2?: string;
	postalCode: string;
	city?: string;
	country?: Country;
}

export interface Consultant {
	id?: number;
	firstName?: string;
	lastName?: string;
	username?: string;
	gender?: Gender;
	email?: string;
	birthday?: string;
	department?: Department;
	schoolYear?: number;
	telephone?: string;
	address?: Address;
}

export interface Country {
	id?: number;
	label?: string;
}

export interface Department {
	id?: number;
	label?: string;
	name?: string;
}

export interface Gender {
	id?: number;
	label?: string;
}

export interface Member {
	id?: number;
	firstName?: string;
	lastName?: string;
	username?: string;
	gender?: Gender;
	email?: string;
	birthday?: string;
	department?: Department;
	schoolYear?: number;
	telephone?: string;
	address?: Address;
	positions?: Position[];
}

export interface Pole {
	id?: number;
	label?: string;
	name?: string;
}

export interface Position {
	id?: number;
	label?: string;
	year?: number;
	isBoard?: boolean;
	pole?: Pole;
}
