/// <reference types="react" />
import { Configuration } from './types';
export interface PsychometricsProps {
    configuration: Configuration;
}
export declare const Psychometrics: ({ configuration: { instructions, scenarios } }: PsychometricsProps) => JSX.Element;
