import React from 'react';
import { Badge, Card } from 'react-bootstrap';

export default function Job({ job }) {// job is the prop that being passed
    return (
        <Card>
            <Card.Body>
                <div className="d-flex justify-content-btween">
                    <div>
                        <Card.Title>
                            {job.title} - <span className="text-muted font-weight-light">{job.company}</span>
                        </Card.Title>
                        <Card.Subtitle className="text-muted mb-2">
                            {new Date(job.created_at).toLocaleDateString()}
                        </Card.Subtitle>
                        <Badge className="mr-2" variant="secondary">{job.type}</Badge>
                        <Badge variant="secondary">{job.location}</Badge>
                    </div>
                </div>
            </Card.Body>
        </Card>
    );
};