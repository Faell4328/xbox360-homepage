import type { Game } from '../interfaces';

export const GAMES: Game[] = [
    { name: 'Astroneer', image: 'astroneer.jpg', icon: 'steam', rating: 4 },
    { name: 'Bordelands', image: 'bordelands.jpg', icon: 'xbox', rating: 3 },
    { name: 'Dyson Sphere Program', image: 'dyson-sphere-program.jpg', icon: 'steam', rating: 5 },
    { name: 'Forza Horizon', image: 'forza-horizon.jpg', icon: 'xbox', rating: 4 },
    { name: 'Gears of War 2', image: 'gears-of-war-2.jpg', icon: 'xbox', rating: 3.5 },
    { name: 'Happy Wars', image: 'happy-wars.jpg', icon: 'xbox', rating: 5 },
    { name: 'Minecraft', image: 'minecraft.jpeg', icon: ['xbox', 'pc'], rating: 5 },
    { name: 'Midnight Club: Los Angeles', image: 'midnight-club-lo.jpg', icon: 'xbox', rating: 4 },
    { name: 'Skyrim', image: 'skyrim.jpg', icon: ['xbox', 'pc'], rating: 5 },
    {
        name: 'Supreme Commander 2',
        image: 'supreme-commander-2.jpg',
        icon: ['xbox', 'steam'],
        rating: 4,
    },
    { name: 'Turing Complete', image: 'turing-complete.jpg', icon: 'steam', rating: 5 },
];
