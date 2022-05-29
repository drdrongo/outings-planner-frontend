import { Avatar } from '@mui/material';
import PageLayout from '../../components/page_layout/page_layout';
import { useAuthContext } from '../../contexts/auth_context';
import { useCouplesContext } from '../../contexts/couples_context';
import { useThemeContext } from '../../contexts/theme_context';
import './styles.scss';

const MyCouple = () => {
	const { me } = useAuthContext();
	const { theme } = useThemeContext();
	const { myCouple, myPartner: part } = useCouplesContext();

	if (!part || !myCouple)
		return <PageLayout>No partner ya loser!</PageLayout>;

	console.log({
		me,
		myCouple,
		part,
	});

	const avatarSize = 120;

	const datify = (timestamp: string) => {
		const d = new Date(timestamp);
		const dateStr = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
		return dateStr;
	};

	return (
		<PageLayout id="MyCouple">
			<div className="info-section">
				<div className="avatars">
					{
						<Avatar
							sx={{ width: avatarSize, height: avatarSize }}
							src={
								(me?.image?.length || 0) > 0
									? me.image
									: 'https://gravatar.com/avatar/468355c6815fe2c112e0de6724ca5c0a?s=400&d=robohash&r=x'
							}
						/>
					}
					{
						<Avatar
							sx={{ width: avatarSize, height: avatarSize }}
							src={
								(part?.image?.length || 0) > 0
									? part.image
									: 'https://gravatar.com/avatar/468355c68f5fe2c112e0de6724ca5c0a?s=400&d=robohash&r=x'
							}
						/>
					}
				</div>

				<h1>
					{me.f_name} &#38; {part.f_name}
				</h1>

				<div className="quick-stats">
					<div className="stat">
						<span># Dates</span>
						<span>{myCouple.total_outings}</span>
					</div>
					<div className="stat">
						<span>Last date</span>
						<span>{datify(myCouple.updated_at || '')}</span>
					</div>
					<div className="stat">
						<span>Started</span>
						<span>{datify(myCouple.created_at || '')}</span>
					</div>
				</div>

				<div
					className="round-edge"
					style={{ backgroundColor: '#4DA4EA' }}
				>
					<div />
				</div>
			</div>

			<div className="stats-section">
        {/* <table>
          <tr>
            <th>{part.f_name}</th>
            <th>{me.f_name}</th>
          </tr>
          <tr>
            <td>Maria Anders</td>
            <td>Germany</td>
          </tr>
          <tr>
            <td>Francisco Chang</td>
            <td>Mexico</td>
          </tr>
        </table>
 */}

				<div className="stats-grid">
          <span>{part.f_name}</span>
          <span>{me.f_name}</span>

          <span>
            XYZ
            <span className="row-title">
              Title
            </span>
          </span>

          <span>XYZZ</span>

          {/* ONE ROW: */}
          <span>
            XYZ
            <span className="row-title">Title</span>
          </span>

          <span>
            XYZ
          </span>

          {/* ONE ROW: */}
          <span>
            XYZ
            <span className="row-title">Title</span>
          </span>

          <span>
            XYZ
          </span>
				</div>
			</div>
		</PageLayout>
	);
};

export default MyCouple;
