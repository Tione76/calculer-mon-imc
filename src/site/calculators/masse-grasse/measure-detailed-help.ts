import type { BodyFatMeasureField } from "./method-requirements";

export interface MeasureDetailedHelp {
  title: string;
  body: string;
  ariaLabel: string;
}

export const MEASURE_DETAILED_HELP: Record<BodyFatMeasureField, MeasureDetailedHelp> = {
  waistCm: {
    title: "Comment mesurer votre tour de taille ?",
    body: "Placez le mètre ruban horizontalement autour de votre abdomen, généralement à mi-distance entre la dernière côte et le haut de la hanche. Gardez le ventre détendu, respirez normalement et prenez la mesure à la fin d'une expiration, sans rentrer le ventre ni serrer le ruban.",
    ariaLabel: "Comment mesurer le tour de taille ?",
  },
  neckCm: {
    title: "Comment mesurer votre tour de cou ?",
    body: "Placez le mètre ruban juste sous le larynx, autour de la partie la plus étroite du cou. Gardez la tête droite et le regard horizontal. Le ruban doit rester à plat contre la peau, sans comprimer le cou.",
    ariaLabel: "Comment mesurer le tour de cou ?",
  },
  hipCm: {
    title: "Comment mesurer votre tour de hanches ?",
    body: "Placez le mètre ruban horizontalement autour de la partie la plus large des fesses et des hanches. Gardez les pieds rapprochés, tenez-vous droit et vérifiez que le ruban reste parallèle au sol, sans serrer.",
    ariaLabel: "Comment mesurer le tour de hanches ?",
  },
};
