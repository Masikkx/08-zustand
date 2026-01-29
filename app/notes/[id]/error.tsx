'use client';

type Props={
    error:Error;
    reset:() =>void;
};

const Error=({error, reset}:Props)=>{
    return <p>Could not fetch the list of notes. {error.message}</p>
}
export default Error;