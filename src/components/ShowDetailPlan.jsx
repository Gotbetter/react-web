import '../componentsCssFile/ShowDetailPlan.css';
export default function ShowDetailPlan ({content}) {
    
    return (
        <div className='plancontent'>
            <h3>
                <input type='checkbox' className='check'></input>{content}
            </h3>
        </div>
    );
}