export interface ISubscribeForm {
	name: string;
	email: string;
	dob: Date;
	gender: Gender
}

enum Gender {
	male,
	female,
	other
}