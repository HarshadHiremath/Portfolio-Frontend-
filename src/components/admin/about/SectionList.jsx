import React from 'react';
import SectionCard from './SectionCard';

const SectionList = ({ entries, sectionType, onEdit, onDelete }) => {
  return (
    <div className="space-y-4">
      {entries.length === 0 ? (
        <p className="text-gray-600 text-center">
          No {sectionType} available. Add one to get started!
        </p>
      ) : (
        entries.map((entry) => (
          <SectionCard
            key={entry._id}
            entry={entry}
            sectionType={sectionType}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))
      )}
    </div>
  );
};

export default SectionList;