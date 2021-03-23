export interface ISubscription {
	subscriber: {
		name: string;
		email: string;
		dob: Date;
		gender: Gender;
	}
	eventId: string;
	time: Date;
}

export interface ISubscriptions {
	[id: string]: Subscriber
}

enum Gender {
	male,
	female,
	other
}
type Subscriber = {
	name: string;
	email: string;
	dob: Date;
	gender: Gender;
}
