import React from 'react';

export default function Job({ job }) {// job is the prop that being passed
    return (
        <div>
            {job.title}
        </div>
    );
};