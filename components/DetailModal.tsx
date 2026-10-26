import React from 'react';
import { ResearchOpportunity } from '../types';
import { Badge } from './Badge';

interface DetailModalProps {
  opportunity: ResearchOpportunity;
  onClose: () => void;
}

const renderTextWithLinks = (text: string) => {
  const urlRegex = /(https?:\/\/[^\s\)]+)/g;
  const parts = text.split(urlRegex);
  return parts.map((part, i) => {
    if (part.match(urlRegex)) {
      return (
        <a
          key={i}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="text-brand-600 underline hover:text-brand-800 break-all"
        >
          {part}
        </a>
      );
    }
    return part;
  });
};

export const DetailModal: React.FC<DetailModalProps> = ({ opportunity, onClose }) => {
  return (
    <div className="relative z-50" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose}></div>

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-6">
            
            {/* Header */}
            <div>
              <h3 className="text-xl font-semibold leading-6 text-gray-900" id="modal-title">
                {opportunity.piFirstName} {opportunity.piLastName}, {opportunity.degree}
              </h3>
              <div className="flex flex-wrap items-center gap-2 mt-1">
                {opportunity.institution && (
                  <span className="inline-flex items-center rounded-md bg-brand-50 px-2 py-0.5 text-xs font-semibold text-brand-800 border border-brand-200">
                    {opportunity.institution}
                  </span>
                )}
                <span className="text-sm text-gray-500">{opportunity.department}</span>
              </div>
            </div>

            {/* Content */}
            <div className="mt-6 space-y-4">
              
              <div>
                <h4 className="text-sm font-medium text-gray-900">Research Focus</h4>
                <p className="text-sm text-gray-600 mt-1">{opportunity.researchFocus}</p>
              </div>

               <div>
                <h4 className="text-sm font-medium text-gray-900">Program Description</h4>
                <p className="text-sm text-gray-600 mt-1">{renderTextWithLinks(opportunity.programDescription)}</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                <h4 className="text-sm font-bold text-gray-900">Project Overview</h4>
                <p className="text-sm text-gray-700 mt-2 whitespace-pre-wrap">{renderTextWithLinks(opportunity.projectOverview)}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                 <div>
                  <h4 className="text-sm font-medium text-gray-900">Keywords</h4>
                  <div className="mt-1 flex flex-wrap">
                    {opportunity.keywords.split(',').map((k, i) => (
                      <Badge key={i} color="gray">{k.trim()}</Badge>
                    ))}
                  </div>
                </div>
                <div>
                   <h4 className="text-sm font-medium text-gray-900">Details</h4>
                   <ul className="mt-1 text-sm text-gray-600 list-disc list-inside">
                      <li><strong>Students needed:</strong> {opportunity.studentCount}</li>
                      <li><strong>Start Term:</strong> {opportunity.startTerm || 'Flexible/Negotiable'}</li>
                   </ul>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-900">Timeframe</h4>
                 <div className="mt-1 flex flex-wrap gap-2">
                    {opportunity.timeframe.map((t, i) => (
                      <Badge key={i} color={t.includes('Summer') ? 'yellow' : 'indigo'}>
                        {t}
                      </Badge>
                    ))}
                  </div>
              </div>

            </div>

            {/* Actions */}
            <div className="mt-6 sm:mt-8 sm:flex sm:flex-row-reverse gap-3">
              <a 
                href={`mailto:${opportunity.email}?subject=Inquiry regarding research opportunity`}
                className="inline-flex w-full justify-center rounded-md bg-brand-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brand-900 sm:w-auto"
              >
                Contact PI
              </a>
              <button 
                type="button" 
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                onClick={onClose}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
