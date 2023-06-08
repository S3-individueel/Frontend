import React, { useEffect, useState } from "react";
import CitizenDataService from "../../services/citizen.service";
import ICitizenData from '../../types/citizen';
import DiscussionsList from '../03_organism/o-discussionsList'

type Props = {};

const HomePage: React.FC<Props> = () => {
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
            <DiscussionsList />
            {citizens.map((citizen: ICitizenData, index: number) => (
                <h2 key={index}>#{citizen.id + " " + citizen.firstname + ' ' + citizen.lastname}</h2>
            ))}

            <form name="citizen" onSubmit={postCitizen}>
                <input name="firstname" defaultValue="Che" type="text" id="firstname" placeholder="firstname"></input>
                <input name="lastname" defaultValue="Guevara" type="text" id="lastname" placeholder="lastname"></input>
                <input name="dateOfBirth" defaultValue="2023-06-01T00:27:22.626Z" type="text" id="dateOfBirth" placeholder="date of birth"></input>
                <input name="gender" defaultValue="man" type="text" id="gender" placeholder="ender"></input>
                <input name="photo" defaultValue="" type="text" id="photo" placeholder="photo"></input>
                <button type="submit">Submit</button>
            </form>

            <br></br>

            <form onSubmit={deleteCitizen}>
                <input type="number" name="id" defaultValue="1"></input>
                <button type="submit">Delete</button>
            </form>
        </div>
    );
};

export default HomePage;
