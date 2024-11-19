import { Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    LineController,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    LineController,    // Register LineController globally
    LineElement,       // Register LineElement globally
    Title,
    Tooltip,
    Legend
);

export default defineNuxtPlugin(nuxtApp => {
    nuxtApp.provide('chartJS', ChartJS);
});
