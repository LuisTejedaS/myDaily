'use client'

import NewDaily from '../../components/newDaily/newDaily';


const Daily = ({ params }: { params: { id: string } }) => {

    return (
        <NewDaily dailyId={params.id} ></NewDaily >
    );
};
export default Daily;