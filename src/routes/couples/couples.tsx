import { useEffect, useState } from 'react';
import { useAuthContext } from '../../contexts/auth_context';
import http from '../../data/http';

interface ICouple {
	id: number;
	user1_id: number;
	user2_id: number;
	total_outings: number;
	created_at: string;
	updated_at: string;
};

export default function Couples() {
	const { me } = useAuthContext();
	const [couples, setCouples] = useState([]);

	const fetchCouples = async () => {
		const response = await http.get('/api/v1/couples', { user_id: me.id });
		console.log({ response });
		setCouples(response);
	};

	useEffect(() => {
		fetchCouples();
	}, []);

	const CouplesList = () => {
		return (
			<ul>
				{couples.map((c:ICouple) => (
					<li key={c.id}>{JSON.stringify(c)}</li>
				))}
			</ul>
		);
	};

	return (
		<div className="main">
			<CouplesList />
		</div>
	);
}
