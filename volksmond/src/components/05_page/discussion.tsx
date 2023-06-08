import React, { useEffect, useState } from "react";
import CitizenDataService from "../../services/citizen.service";
import ICitizenData from '../../types/citizen';
import '../../styles/03_organism/o-solutionsList.scss'
import '../../styles/02_molecule/m-commentsList.scss'

type Props = {};

const DiscussionPage: React.FC<Props> = () => {
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
            <h1>Viva La Revolution</h1>
            <span>Che Guevara</span>
            <p>
                How should we stop the American oppression of Cuba?
            </p>
            <strong>Referendum starts 20/7/2023</strong>

            <h2>Suggested solutions</h2>
            <div className="o-solutionsList">
                <div className="o-solutionsList__card">
                    <h3>Throw rotten eggs!</h3>
                    <span>Pietje Bel</span>
                    <p>
                        We should throw rotten eggs at the rich people's yaughts.
                    </p>

                    <div className="m-commentsList">
                        <span>User</span>
                        <p>Lorem ipsum sample text comment sentence.</p>
                        <div>
                            <span>User</span>
                            <p>Lorem ipsum sample text comment sentence.</p>
                            <div>
                                <span>User</span>
                                <p>Lorem ipsum sample text comment sentence.</p>
                                <div>
                                    <span>User</span>
                                    <p>Lorem ipsum sample text comment sentence.</p>
                                </div>
                            </div>
                            <span>User</span>
                            <p>Lorem ipsum sample text comment sentence.</p>

                            <span>User</span>
                            <p>Lorem ipsum sample text comment sentence.</p>
                        </div>
                    </div>

                    <div>
                        <span>-19 points</span>
                        <a href="#">See all comments</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DiscussionPage;
