import { Avatar } from '@mui/material';
import PageLayout from '../../components/page_layout/page_layout';
import { useCouplesContext } from '../../contexts/couples_context';
import './styles.scss'

const MyCouple = () => {
  const { myCouple, myPartner } = useCouplesContext();

  if (!myPartner || !myCouple) return (
    <PageLayout>
      No partner ya loser!
    </PageLayout>
  )

  const {
    id,
    f_name,
    l_name,
    email,
    image,
    birthday,
    created_at,
    updated_at,
  } = myPartner;

  return (
    <PageLayout>
      {<Avatar src={(image && image.length > 0) ? myPartner.image : 'https://gravatar.com/avatar/468355c6815fe2c112e0de6724ca5c0a?s=400&d=robohash&r=x'}/>}

      <h1>Your partner: {f_name} {l_name}</h1>
      <h2>Email: {email}</h2>
      <h2>Birthday: {birthday}</h2>
      <h3>Been together since: {created_at}</h3>
    </PageLayout>
  )
}

export default MyCouple