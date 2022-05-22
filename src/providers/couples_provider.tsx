import { useState, useEffect } from 'react';
import { useAuthContext } from '../contexts/auth_context';
import { CouplesContext } from '../contexts/couples_context';
import { fetchMyPartner, ICoupleResponse } from '../data/couples';

type Props = {
  children?: React.ReactNode;
};

const CouplesProvider = ({ children }: Props) => {
	const { me } = useAuthContext();
	const [myCouple, setMyCouple] = useState({});
	const [myPartner, setMyPartner] = useState({});

	useEffect(() => {
		if (!me.id) return;

		fetchMyPartner(me.id).then((response: ICoupleResponse) => {
			setMyCouple(response.couple);
			setMyPartner(response.partner);
		});
	}, [me.id]);

	return (
		<CouplesContext.Provider value={{ myCouple, myPartner }}>
			{children}
		</CouplesContext.Provider>
	);
};

export default CouplesProvider;