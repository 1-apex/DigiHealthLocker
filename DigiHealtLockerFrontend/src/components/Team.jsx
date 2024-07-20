import { FaArrowRightLong } from "react-icons/fa6";

const people = [
    {
        name: 'Prathamesh Patil',
        role: 'Developer',
        imageUrl: '../../src/assets/images/WhatsApp Image 2024-06-15 at 09.33.53_b9af43f8.jpg'
    },
    {
        name: 'Tejas Pundpal',
        role: 'Developer',
        imageUrl:
            '../../src/assets/images/WhatsApp Image 2024-06-15 at 10.09.39_e8b3528c.jpg',
    },
    {
        name: 'Vedang Surnis',
        role: 'Developer',
        imageUrl: '../../src/assets/images/IMG_20200812_111652653_4-min-Resized-proper.jpg'
    },
    {
        name: 'kartik Thombare',
        role: 'Developer',
        imageUrl: '../../src/assets/images/WhatsApp Image 2024-06-15 at 09.32.47_204009dc.jpg'
    },
    {
        name: 'Purshottam Rajpurohit',
        role: 'Developer',
        imageUrl: '../../src/assets/images/WhatsApp Image 2024-06-15 at 09.43.03_2956fa81.jpg'
    },

]

export default function Team() {
    return (
        <>
            <div className="bg-white py-24 sm:py-32">
                <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-3">
                    <div className="max-w-2xl">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Meet our team</h2>
                        <FaArrowRightLong size={40} />
                    </div>
                    <ul role="list" className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2">
                        {people.map((person) => (
                            <li key={person.name}>
                                <div className="flex items-center gap-x-6">
                                    <img className="h-16 w-16 rounded-full" src={person.imageUrl} alt="" />
                                    <div>
                                        <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">{person.name}</h3>
                                        <p className="text-sm font-semibold leading-6 text-teal-600">{person.role}</p>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>

    )
}
