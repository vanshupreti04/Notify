import React from 'react';

const Sidebar = ({ pages, selectedPage, setSelectedPage, createPage, addBlock, savePage, inviteUser }) => {
  return (
    <div className="sidebar">
      <h2>Pages</h2>
      <ul>
        {pages.map((page) => (
          <li key={page._id} onClick={() => setSelectedPage(page._id)}>
            {page.title}
          </li>
        ))}
      </ul>
      <button onClick={createPage}>+ New Page</button>
      {selectedPage && (
        <>
          <button onClick={() => addBlock(selectedPage)}>+ Add Block</button>
          <button onClick={() => savePage(selectedPage)}>💾 Save Page</button>
          <button onClick={() => inviteUser(selectedPage)}>📩 Invite User</button>
        </>
      )}
    </div>
  );
};

export default Sidebar;
