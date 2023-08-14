import '../componentsCssFile/ShowDetailPlan.css';
import { useNavigate, useLocation } from 'react-router-dom';
export default function ShowDetailPlan ({content, detailPlanId}) {
    const location = useLocation();
    console.log(location);
    const authId = location.state.authId;
    const planId = location.state.planId;
    const movePage = useNavigate();

    const moveToCertificationPage = () => {
        movePage('/certification', {state: {authId: authId, detailPlanId: detailPlanId, planId: planId}});
    }
    return (
        <div className='plancontent' onClick={moveToCertificationPage}>
            <h3>
                <input type='checkbox' className='check'></input>{content}
            </h3>
        </div>
    );
}