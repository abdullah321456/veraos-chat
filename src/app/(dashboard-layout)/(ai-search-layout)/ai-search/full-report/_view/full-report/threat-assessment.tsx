import { Accordion } from '../../_components/accordion';

export function ThreatAssessment({ isEditable }: { isEditable: boolean }) {
  return (
    <Accordion translateButton={isEditable} title="Threat Assessment">
      <div className="text-xs">
        <p>
          Alfonso Angel Diaz-Juarez, a high-risk fugitive, is involved in a violent sex-trafficking ring and was indicted in 2013 with 13
          others. He allegedly used force and coercion to exploit undocumented Mexican women and children in brothels.
        </p>
        <p className="mt-2">
          With a federal warrant for sex-trafficking conspiracy and harboring illegal aliens, his capture is vital for public safety.
        </p>
      </div>
    </Accordion>
  );
}
