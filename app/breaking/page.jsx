"use client";

import breakingStyles from '../../styles/breaking.module.css';

export default function Page() {
  return (
    <div className={breakingStyles.component}>
      <div>BREAKING</div>
      <div>
        <button>
          break this
        </button>
      </div>
    </div>
  );
}
