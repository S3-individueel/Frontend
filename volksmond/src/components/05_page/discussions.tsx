import React, { useEffect, useState } from "react";
import CitizenDataService from "../../services/citizen.service";
import ICitizenData from '../../types/citizen';
import '../../styles/03_organism/o-discussionsList.scss';

type Props = {};

const CitizensList: React.FC<Props> = () => {
    const [citizens, setCitizens] = useState<ICitizenData[]>([]);

    useEffect(() => {
        retrieveAllCitizens();
    }, []);

    const retrieveAllCitizens = (): void => {
        CitizenDataService.getAll()
            .then((response: any) => {
                setCitizens(response.data);
                console.log(response.data);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    };

    const postCitizen = (e: React.FormEvent): void => {
        e.preventDefault();

        const target = e.target as typeof e.target & {
            id?: { value: Uint32Array },
            firstname: { value: string },
            lastname: { value: string },
            dateOfBirth?: { value: Date },
            gender: { value: string },
            photo: { value: string }
        };

        const citizen: ICitizenData = {
            id: target.id?.value,
            firstname: target.firstname.value,
            lastname: target.lastname.value,
            dateOfBirth: target.dateOfBirth?.value,
            gender: target.gender.value,
            photo: target.photo.value
        };

        CitizenDataService.create(citizen)
            .then((response: any) => {
                setCitizens([...citizens, response.data]);
                console.log(response.data);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    };

    const deleteCitizen = (e: React.FormEvent): void => {
        e.preventDefault();
        const target = e.target as typeof e.target & {
            id: { value: number }
        };
        CitizenDataService.delete(target.id.value);
    };

    return (
        <div>
            <h1>Discussions</h1>
            <div className="o-discussionsList">
                <div className="o-discussionsList__card">
                    <h2>Viva La Revolution</h2>
                    <span>Che Guevara</span>
                    <p>
                        How should we stop the American opression of Cuba?
                    </p>
                    <a href="#">See discussions</a>
                </div>
                <div className="o-discussionsList__card">
                    <h2>Viva La Revolution</h2>
                    <span>Che Guevara</span>
                    <p>
                        How should we stop the American opression of Cuba?
                    </p>
                    <a href="#">See discussions</a>
                </div>
                <div className="o-discussionsList__card">
                    <h2>Viva La Revolution</h2>
                    <span>Che Guevara</span>
                    <p>
                        How should we stop the American opression of Cuba?
                    </p>
                    <a href="#">See discussions</a>
                </div>
                <div className="o-discussionsList__card">
                    <h2>Viva La Revolution</h2>
                    <span>Che Guevara</span>
                    <p>
                        How should we stop the American opression of Cuba?
                    </p>
                    <a href="#">See discussions</a>
                </div>
            </div>
        </div>
    );
};

export default CitizensList;
