import http from './http';
import { IUser } from './users';

export interface ICoupleResponse {
	couple: ICouple;
	partner: IUser;
}

export interface ICouple {
	id?: number;
	user1_id?: number;
	user2_id?: number;
	total_outings?: number;
	created_at?: string;
	updated_at?: string;
}

export const fetchMyPartner: Function = async (myId: number) => {
	const response: ICoupleResponse = await http.get('/api/v1/couples/get_partner', {
		user1_id: myId,
	});
  const couple: ICouple = response.couple;
  const partner: IUser = response.partner;
	console.log({ couple, partner });
	return { couple, partner };
};
