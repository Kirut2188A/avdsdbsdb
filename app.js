// Add at the top of DOM Elements section
const APP_NAME = 'Notes';
document.title = APP_NAME;

// DOM Elements
const notesList = document.querySelector('.notes-list');
const noteEditor = document.getElementById('note-editor');
const newNoteBtn = document.querySelector('.new-note-btn');
const saveBtn = document.querySelector('.save-btn');
const deleteBtn = document.querySelector('.delete-btn');
const chatInput = document.querySelector('.chat-input textarea');
const sendBtn = document.querySelector('.send-btn');
const chatMessages = document.querySelector('.chat-messages');
const apiKeyInput = document.getElementById('api-key-input');
const unlockBtn = document.querySelector('.unlock-btn');
const apiKeySection = document.querySelector('.api-key-section');
const formatButtons = document.querySelectorAll('.format-btn');
const quickAIPanel = document.querySelector('.quick-ai-panel');
const closeQuickAI = document.querySelector('.close-quick-ai');
const selectedTextDisplay = document.querySelector('.selected-text');
const viewModeBtn = document.querySelector('.mode-btn[data-mode="view"]');
const editModeBtn = document.querySelector('.mode-btn[data-mode="edit"]');
const mainEditor = document.querySelector('.main-editor');
const chatContainer = document.querySelector('.chat-container');
const chatInputContainer = document.querySelector('.chat-input');
const editButtons = document.querySelectorAll('.edit-btn');
const toneSelect = document.querySelector('.tone-select');
const applyToneBtn = document.querySelector('.apply-tone-btn');
const toneOptions = document.querySelector('.tone-options');
const noteTagsBtn = document.querySelector('.note-tags-btn');
const contextMenu = document.getElementById('noteContextMenu');
const contextMenuTags = document.querySelector('.context-menu-tags');

// Tag Management Elements
const manageTagsBtn = document.querySelector('.manage-tags-btn');
const tagModal = document.querySelector('.tag-modal');
const noteTagsModal = document.querySelector('.note-tags-modal');
const tagNameInput = document.querySelector('.tag-name-input');
const tagColorInput = document.querySelector('.tag-color-input');
const addTagBtn = document.querySelector('.add-tag-btn');
const tagsList = document.querySelector('.tags-list');
const noteTagsList = document.querySelector('.note-tags-list');
const tagFilterSelect = document.querySelector('.tag-filter-select');
const closeModalBtns = document.querySelectorAll('.close-modal');

// Encryption Elements
const encryptBtn = document.querySelector('.encrypt-btn');
const encryptionModal = document.querySelector('.encryption-modal');
const encryptionPassword = document.querySelector('.encryption-password');
const encryptionConfirmPassword = document.querySelector('.encryption-confirm-password');
const encryptionConfirmContainer = document.querySelector('.encryption-confirm-password-container');
const encryptionSubmitBtn = document.querySelector('.encryption-submit-btn');
const encryptionModalTitle = document.querySelector('.encryption-modal-title');

// Code editor elements
const codeModeBtn = document.querySelector('.mode-btn[data-mode="code"]');
const codeEditor = document.querySelector('.code-editor');
const htmlEditor = document.querySelector('.html-editor');
const cssEditor = document.querySelector('.css-editor');
const previewFrame = document.querySelector('.preview-frame');

// Import note elements
const importNoteBtn = document.querySelector('.import-note-btn');
const importModal = document.querySelector('.import-modal');
const noteFileInput = document.getElementById('noteFileInput');
const selectedFileName = document.querySelector('.selected-file-name');
const importPassword = document.querySelector('.import-password');
const importSubmitBtn = document.querySelector('.import-submit-btn');

// App state
let notes = JSON.parse(localStorage.getItem('notes')) || [];
let tags = JSON.parse(localStorage.getItem('tags')) || [];
let currentNoteId = null;
let apiKey = localStorage.getItem('openai_api_key') || null;
let selectedText = '';
let isEditMode = false;
let isEncrypting = false;

// Add to the top with other DOM elements
const editorContent = document.querySelector('.editor-content');

// Matrix animation characters
const matrixChars = '01';

// Add after DOM Elements section
const processingIndicator = document.createElement('div');
processingIndicator.className = 'ai-processing';
processingIndicator.innerHTML = `
    <span>AI is thinking</span>
    <div class="ai-processing-dots">
        <div class="ai-processing-dot"></div>
        <div class="ai-processing-dot"></div>
        <div class="ai-processing-dot"></div>
    </div>
`;

// Add to DOM Elements section
const aiAnalysisModal = document.createElement('div');
aiAnalysisModal.className = 'modal ai-analysis-modal';
aiAnalysisModal.innerHTML = `
    <div class="modal-content">
        <div class="modal-header">
            <h3>${APP_NAME} - AI Deep Analysis</h3>
            <button class="close-modal">×</button>
        </div>
        <div class="modal-body">
            <div class="selected-text-display"></div>
            <div class="ai-analysis-content"></div>
        </div>
    </div>
`;
document.body.appendChild(aiAnalysisModal);

// Add to DOM Elements section
const deepSearchSection = document.createElement('div');
deepSearchSection.className = 'deep-search-section';
deepSearchSection.innerHTML = `
    <div class="deep-search-header">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z"/>
            <path d="M12 6a2 2 0 1 0 2 2 2 2 0 0 0-2-2zm0 10a1 1 0 0 0-1-1h0a1 1 0 0 0-1 1v0a1 1 0 0 0 1 1h0a1 1 0 0 0 1-1z"/>
        </svg>
        <h4>AI Deep Analysis</h4>
        <button class="expand-analysis-btn" title="Open in full view">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
            </svg>
        </button>
    </div>
    <div class="deep-search-results"></div>
    <button class="deep-search-btn">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z"/>
            <path d="M15 9l-6 6M9 9l6 6"/>
        </svg>
        Analyze with AI
    </button>
`;

// Create loading animation container
function createLoadingAnimation() {
    const container = document.createElement('div');
    container.className = 'encryption-animation-container';
    
    const loadingAnimation = document.createElement('div');
    loadingAnimation.className = 'loading-animation';
    
    const loadingCircle = document.createElement('div');
    loadingCircle.className = 'loading-circle';
    
    const status = document.createElement('div');
    status.className = 'encryption-status';
    
    loadingAnimation.appendChild(loadingCircle);
    loadingAnimation.appendChild(status);
    container.appendChild(loadingAnimation);
    
    return container;
}

// Create content overlay
function createOverlay(action) {
    const overlay = document.createElement('div');
    overlay.className = 'content-overlay';
    
    const status = document.createElement('div');
    status.className = 'encryption-status';
    status.textContent = action === 'encrypt' ? 'ENCRYPTING...' : 'DECRYPTING...';
    
    overlay.appendChild(status);
    return overlay;
}

// Create new note
function createNewNote() {
    const newNote = {
        id: Date.now().toString(),
        title: 'Untitled Note',
        content: '<h1>Untitled Note</h1><p>Start writing here...</p>',
        htmlContent: '<h1>Untitled Note</h1><p>Start writing here...</p>',
        cssContent: getDefaultCSS(),
        type: 'rich-text',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        tags: [],
        encrypted: false,
        customDescription: '',
        useCustomDescription: false
    };
    
    notes.unshift(newNote);
    saveNotes();
    currentNoteId = newNote.id;
    renderNotesList();
    loadNote(newNote.id);
    setMode('edit');
}

// Initialize the app
function init() {
    checkAPIKey();
    renderNotesList();
    renderTagsList();
    updateTagFilter();
    
    // Create a default note if none exists
    if (notes.length === 0) {
        createNewNote();
    } else {
        loadNote(notes[0].id);
    }
    
    setupEventListeners();
    setMode('view'); // Start in view mode
    setupExportHandlers();
}

// Check if API key exists and is valid
function checkAPIKey() {
    if (apiKey) {
        unlockChatPanel();
    } else {
        lockChatPanel();
    }
}

// Lock the chat panel
function lockChatPanel() {
    chatMessages.style.display = 'none';
    chatInputContainer.style.display = 'none';
    apiKeySection.innerHTML = `
        <div class="lock-icon">🔒</div>
        <h3>AI Deep Analysis</h3>
        <p>Enter your OpenAI API key to unlock AI features. Your key is stored locally and never sent to our servers.</p>
        <div class="api-key-input">
            <input type="password" id="api-key-input" placeholder="sk-...">
            <button class="unlock-btn">Unlock</button>
        </div>
    `;
    apiKeySection.style.display = 'flex';

    // Reattach event listeners
    const newUnlockBtn = apiKeySection.querySelector('.unlock-btn');
    const newApiKeyInput = apiKeySection.querySelector('#api-key-input');

    // Handle unlock button click
    newUnlockBtn.addEventListener('click', handleUnlock);

    // Handle enter key in input
    newApiKeyInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleUnlock();
        }
    });
}

// Unlock the chat panel
function unlockChatPanel() {
    apiKeySection.style.display = 'none';
    chatMessages.style.display = 'block';
    chatInputContainer.style.display = 'flex';
    chatMessages.innerHTML = ''; // Clear any previous messages
    addMessageToChat('AI Assistant is ready to help! Type your message below.', 'assistant');
}

// Validate API key
async function validateAPIKey(key) {
    try {
        const response = await fetch('https://api.openai.com/v1/models', {
            headers: {
                'Authorization': `Bearer ${key}`
            }
        });

        if (!response.ok) {
            throw new Error('Invalid API key');
        }

        return true;
    } catch (error) {
        throw new Error('Invalid API key');
    }
}

// Setup all event listeners
function setupEventListeners() {
    // Note management
    if (newNoteBtn) newNoteBtn.addEventListener('click', createNewNote);
    if (saveBtn) saveBtn.addEventListener('click', saveCurrentNote);
    if (deleteBtn) deleteBtn.addEventListener('click', deleteCurrentNote);
    if (noteTagsBtn) noteTagsBtn.addEventListener('click', showNoteTagsModal);
    
    // Chat functionality
    if (sendBtn) sendBtn.addEventListener('click', sendMessage);
    if (chatInput) {
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
            }
        });
    }

    // API key handling
    if (unlockBtn) unlockBtn.addEventListener('click', handleUnlock);
    if (apiKeyInput) {
        apiKeyInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                handleUnlock();
            }
        });
    }

    // Auto-save when typing
    let saveTimeout;
    if (noteEditor) {
        noteEditor.addEventListener('input', () => {
            if (!isEditMode) return;
            clearTimeout(saveTimeout);
            saveTimeout = setTimeout(saveCurrentNote, 1000);
        });
    }

    // Mode toggle buttons
    if (viewModeBtn) viewModeBtn.addEventListener('click', () => setMode('view'));
    if (editModeBtn) editModeBtn.addEventListener('click', () => setMode('edit'));

    // Formatting buttons
    if (formatButtons) {
        formatButtons.forEach(button => {
            button.addEventListener('click', () => {
                if (!isEditMode) return;
                const command = button.dataset.command;
                if (command === 'createLink') {
                    const url = prompt('Enter the URL:');
                    if (url) document.execCommand(command, false, url);
                } else {
                    document.execCommand(command, false, null);
                }
                updateFormatButtons();
            });
        });
    }

    // Selection change event for format button states
    document.addEventListener('selectionchange', updateFormatButtons);

    // Quick AI panel
    if (noteEditor) {
        noteEditor.addEventListener('mouseup', () => {
            if (isEditMode) return;
            handleTextSelection();
        });
    }

    if (closeQuickAI) {
        closeQuickAI.addEventListener('click', () => {
            if (quickAIPanel) quickAIPanel.style.display = 'none';
        });
    }

    // Edit buttons
    if (editButtons) {
        editButtons.forEach(button => {
            button.addEventListener('click', () => {
                const action = button.dataset.action;
                if (action === 'change-tone' && toneOptions) {
                    toneOptions.style.display = 'flex';
                } else {
                    handleQuickAIAction(action);
                }
            });
        });
    }

    // Tone change
    if (applyToneBtn && toneSelect) {
        applyToneBtn.addEventListener('click', () => {
            const tone = toneSelect.value;
            handleToneChange(tone);
        });
    }

    // Tag Management
    manageTagsBtn?.addEventListener('click', () => {
        tagModal.classList.add('active');
        renderTagsList();
    });

    addTagBtn?.addEventListener('click', createTag);

    tagFilterSelect?.addEventListener('change', (e) => {
        renderNotesList(e.target.value);
    });

    closeModalBtns?.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.target.closest('.modal').classList.remove('active');
        });
    });

    // Add save button to note tags modal
    const saveNoteTagsBtn = document.createElement('button');
    saveNoteTagsBtn.textContent = 'Save Tags';
    saveNoteTagsBtn.className = 'save-tags-btn';
    saveNoteTagsBtn.addEventListener('click', saveNoteTags);
    noteTagsModal?.querySelector('.modal-header')?.appendChild(saveNoteTagsBtn);

    // Close modals when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            e.target.classList.remove('active');
        }
    });

    // Context menu handling
    document.addEventListener('click', () => {
        if (contextMenu) contextMenu.classList.remove('active');
    });

    // Prevent context menu from closing when clicking inside it
    contextMenu?.addEventListener('click', (e) => {
        e.stopPropagation();
    });

    // Close context menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && contextMenu) {
            contextMenu.classList.remove('active');
        }
    });

    // Encryption
    if (encryptBtn) {
        encryptBtn.addEventListener('click', handleEncryptButtonClick);
    }

    if (encryptionSubmitBtn) {
        encryptionSubmitBtn.addEventListener('click', handleEncryptionSubmit);
    }

    if (encryptionPassword) {
        encryptionPassword.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleEncryptionSubmit();
        });
    }

    // Code editor mode
    if (codeModeBtn) {
        codeModeBtn.addEventListener('click', () => setMode('code'));
    }

    // Live preview updates
    if (htmlEditor) {
        htmlEditor.addEventListener('input', updatePreview);
    }
    if (cssEditor) {
        cssEditor.addEventListener('input', updatePreview);
    }

    // Export functionality
    const exportBtn = document.querySelector('.export-btn');
    const exportModal = document.querySelector('.export-modal');
    const exportOptionBtns = document.querySelectorAll('.export-option-btn');
    
    if (exportBtn) {
        exportBtn.addEventListener('click', () => {
            exportModal.style.display = 'flex';
        });
    }
    
    if (exportOptionBtns) {
        exportOptionBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const format = btn.dataset.format;
                exportNote(format);
                exportModal.style.display = 'none';
            });
        });
    }

    // Close export modal when clicking outside
    if (exportModal) {
        exportModal.addEventListener('click', (e) => {
            if (e.target === exportModal) {
                exportModal.style.display = 'none';
            }
        });
    }

    // Import functionality
    if (importNoteBtn) {
        importNoteBtn.addEventListener('click', () => {
            importModal.classList.add('active');
        });
    }

    if (noteFileInput) {
        noteFileInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                selectedFileName.textContent = file.name;
                importSubmitBtn.disabled = false;
            } else {
                selectedFileName.textContent = 'No file selected';
                importSubmitBtn.disabled = true;
            }
        });
    }

    if (importSubmitBtn) {
        importSubmitBtn.addEventListener('click', handleImportNote);
    }
}

// Update format buttons state based on current selection
function updateFormatButtons() {
    if (!isEditMode) return;
    
    formatButtons?.forEach(button => {
        const command = button.dataset.command;
        if (command === 'createLink') {
            button.classList.toggle('active', document.queryCommandState('createLink'));
        } else {
            button.classList.toggle('active', document.queryCommandState(command));
        }
    });
}

// Handle API key unlock
async function handleUnlock() {
    const apiKeyInput = document.querySelector('#api-key-input');
    const key = apiKeyInput.value.trim();
    
    if (!key) {
        alert('Please enter an API key');
        return;
    }

    try {
        await validateAPIKey(key);
        apiKey = key;
        localStorage.setItem('openai_api_key', key);
        unlockChatPanel();
    } catch (error) {
        alert('Invalid API key. Please check and try again.');
        apiKeyInput.value = '';
    }
}

// Render notes list
async function renderNotesList(tagFilter = 'all') {
    notesList.innerHTML = '';
    const filteredNotes = tagFilter === 'all' 
        ? notes 
        : notes.filter(note => (note.tags || []).includes(tagFilter));

    for (const note of filteredNotes) {
        const noteElement = document.createElement('div');
        noteElement.className = `note-item ${note.id === currentNoteId ? 'active' : ''} ${note.encrypted ? 'encrypted' : ''}`;
        noteElement.dataset.noteId = note.id; // Add data attribute for note ID
        
        // Add context menu event listener
        noteElement.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            showNoteContextMenu(e, note.id);
        });
        
        // Format the date
        const date = new Date(note.createdAt);
        const formattedDate = date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });

        // Get description (custom or AI-generated)
        let description = '';
        if (note.useCustomDescription) {
            description = note.customDescription;
        } else if (apiKey && note.content) {
            description = note.summary || '';
        }

        // Get note tags
        const noteTags = (note.tags || [])
            .map(tagId => tags.find(tag => tag.id === tagId))
            .filter(tag => tag)
            .map(tag => `
                <span class="tag" style="background-color: ${tag.color}">
                    ${tag.name}
                </span>
            `).join('');

        noteElement.innerHTML = `
            <div class="note-title">${note.title || 'Untitled Note'}</div>
            <div class="note-date">${formattedDate}</div>
            ${description ? `<div class="note-summary">${description}</div>` : ''}
            <div class="note-tags">${noteTags}</div>
        `;
        
        noteElement.addEventListener('click', () => loadNote(note.id));
        notesList.appendChild(noteElement);
    }
}

// Load note into editor
function loadNote(noteId) {
    if (!noteId) return;
    currentNoteId = noteId;
    const note = notes.find(n => n.id === noteId);
    if (note) {
        if (note.encrypted) {
            noteEditor.innerHTML = getEncryptedPlaceholder();
            encryptBtn.classList.add('encrypted');
        } else {
            if (note.type === 'custom-html') {
                htmlEditor.value = note.htmlContent || note.content;
                cssEditor.value = note.cssContent || getDefaultCSS();
                noteEditor.innerHTML = note.content;
                setMode('code');
            } else {
                noteEditor.innerHTML = note.content;
                setMode('view');
            }
            encryptBtn.classList.remove('encrypted');
        }
        
        // Update description controls in editor header
        updateDescriptionControls(note);
        
        renderNotesList();
    }
}

// Update description controls in editor header
function updateDescriptionControls(note) {
    // Find or create the description controls container
    let descControls = document.querySelector('.editor-description-controls');
    if (!descControls) {
        descControls = document.createElement('div');
        descControls.className = 'editor-description-controls';
        // Insert before the editor actions div
        const editorActions = document.querySelector('.editor-actions');
        editorActions.parentNode.insertBefore(descControls, editorActions);
    }

    // Create the controls HTML
    const controlsHTML = `
        <div class="description-toggle">
            <label>
                <input type="checkbox" class="custom-desc-toggle" 
                       ${note.useCustomDescription ? 'checked' : ''}
                       data-note-id="${note.id}">
                Custom Description
            </label>
        </div>
        ${note.useCustomDescription ? `
            <textarea class="custom-description" 
                     data-note-id="${note.id}" 
                     placeholder="Enter custom description...">${note.customDescription || ''}</textarea>
        ` : `
            <button class="refresh-summary-btn" data-note-id="${note.id}">
                <svg width="14" height="14" viewBox="0 0 16 16">
                    <path d="M8 3a5 5 0 0 0-5 5v.5a.5.5 0 0 1-1 0V8a6 6 0 0 1 6-6v-1a.5.5 0 0 1 1 0v2a.5.5 0 0 1-.5.5H6a.5.5 0 0 1 0-1h1.535A4.02 4.02 0 0 0 8 3zm-2.5 9.5a.5.5 0 0 1 0-1h1.535A4.02 4.02 0 0 0 8 13a5 5 0 0 0 5-5v-.5a.5.5 0 0 1 1 0V8a6 6 0 0 1-6 6v1a.5.5 0 0 1-1 0v-2a.5.5 0 0 1 .5-.5H10a.5.5 0 0 1 0 1H8.5z"/>
                </svg>
                Refresh Summary
            </button>
        `}
    `;

    // Update the controls
    descControls.innerHTML = controlsHTML;

    // Add event listeners
    const customDescToggle = descControls.querySelector('.custom-desc-toggle');
    const customDescTextarea = descControls.querySelector('.custom-description');
    const refreshBtn = descControls.querySelector('.refresh-summary-btn');

    if (customDescToggle) {
        customDescToggle.addEventListener('change', (e) => {
            toggleCustomDescription(note.id, e.target.checked);
        });
    }

    if (customDescTextarea) {
        customDescTextarea.addEventListener('input', (e) => {
            updateCustomDescription(note.id, e.target.value);
        });
        // Focus the textarea when it appears
        customDescTextarea.focus();
    }

    if (refreshBtn) {
        refreshBtn.addEventListener('click', async (e) => {
            e.preventDefault();
            await refreshNoteSummary(note.id);
        });
    }
}

// Toggle between custom and AI description
function toggleCustomDescription(noteId, useCustom) {
    const note = notes.find(n => n.id === noteId);
    if (note) {
        note.useCustomDescription = useCustom;
        if (!note.customDescription) {
            note.customDescription = ''; // Initialize empty custom description
        }
        saveNotes();
        // Immediately update the description controls
        updateDescriptionControls(note);
        renderNotesList();
    }
}

// Update custom description
function updateCustomDescription(noteId, description) {
    const note = notes.find(n => n.id === noteId);
    if (note) {
        note.customDescription = description;
        saveNotes();
        
        // Update the summary in the notes list without full reload
        const noteElement = document.querySelector(`.note-item[data-note-id="${noteId}"]`);
        if (noteElement) {
            const summaryElement = noteElement.querySelector('.note-summary');
            if (summaryElement) {
                summaryElement.textContent = description;
            } else if (description) {
                // Create summary element if it doesn't exist
                const newSummaryElement = document.createElement('div');
                newSummaryElement.className = 'note-summary';
                newSummaryElement.textContent = description;
                // Insert after the date element
                const dateElement = noteElement.querySelector('.note-date');
                if (dateElement) {
                    dateElement.insertAdjacentElement('afterend', newSummaryElement);
                }
            }
        }
    }
}

// Refresh AI summary for a specific note
async function refreshNoteSummary(noteId) {
    if (!apiKey) {
        alert('Please unlock the AI Assistant first');
        return;
    }

    const note = notes.find(n => n.id === noteId);
    if (!note) return;

    try {
        const summary = await generateNoteSummary(note.content);
        note.summary = summary;
        saveNotes();
        renderNotesList();
    } catch (error) {
        console.error('Error refreshing summary:', error);
        alert('Error generating summary. Please try again.');
    }
}

// Generate AI summary for a note
async function generateNoteSummary(content) {
    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [
                    {
                        role: 'system',
                        content: 'You are a summarizer that creates very concise one-sentence summaries. Keep summaries under 100 characters. Focus on the main topic or key point only.'
                    },
                    {
                        role: 'user',
                        content: `Create a one-sentence summary of this note: "${content}"`
                    }
                ],
                max_tokens: 100
            })
        });

        const data = await response.json();
        if (data.choices && data.choices[0]) {
            return data.choices[0].message.content;
        }
        return '';
    } catch (error) {
        console.error('Error generating summary:', error);
        return '';
    }
}

// Save current note
function saveCurrentNote() {
    if (!currentNoteId) return;
    
    const noteIndex = notes.findIndex(n => n.id === currentNoteId);
    if (noteIndex === -1) return;
    
    const mainEditor = document.querySelector('.main-editor');
    const isCodeMode = mainEditor.classList.contains('code-mode');
    
    if (isCodeMode) {
        notes[noteIndex].type = 'custom-html';
        notes[noteIndex].htmlContent = htmlEditor.value;
        notes[noteIndex].cssContent = cssEditor.value;
        notes[noteIndex].content = htmlEditor.value; // For compatibility
    } else {
        notes[noteIndex].type = 'rich-text';
        notes[noteIndex].content = noteEditor.innerHTML;
    }
    
    notes[noteIndex].title = extractTitle(notes[noteIndex].content);
    notes[noteIndex].updatedAt = new Date().toISOString();
    
    saveNotes();
    renderNotesList();
}

// Extract title from note content
function extractTitle(content) {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = content;
    
    // Try to find the first heading
    const heading = tempDiv.querySelector('h1, h2, h3, h4, h5, h6');
    if (heading) {
        return heading.textContent;
    }
    
    // If no heading, use the first line of text
    const firstLine = tempDiv.textContent.split('\n')[0].trim();
    return firstLine || 'Untitled Note';
}

// Delete current note
function deleteCurrentNote() {
    if (!currentNoteId) return;
    if (confirm('Are you sure you want to delete this note?')) {
        notes = notes.filter(note => note.id !== currentNoteId);
        saveNotes();
        renderNotesList();
        currentNoteId = null;
        noteEditor.value = '';
    }
}

// Save notes to localStorage
function saveNotes() {
    localStorage.setItem('notes', JSON.stringify(notes));
}

// Add these functions before sendMessage
function showAIThinking() {
    // Add thinking effect to editor
    noteEditor.classList.add('ai-thinking');
    
    // Show processing indicator
    document.body.appendChild(processingIndicator);
}

function hideAIThinking() {
    // Remove thinking effect from editor
    noteEditor.classList.remove('ai-thinking');
    
    // Remove processing indicator
    if (processingIndicator.parentNode) {
        processingIndicator.parentNode.removeChild(processingIndicator);
    }
}

// Update the sendMessage function
async function sendMessage() {
    if (!apiKey) {
        alert('Please unlock the AI Assistant first');
        return;
    }

    const message = chatInput.value.trim();
    if (!message) return;

    // Add user message to chat
    addMessageToChat(message, 'user');
    chatInput.value = '';

    try {
        // Get current note content
        const currentNote = notes.find(note => note.id === currentNoteId);
        if (!currentNote) {
            addMessageToChat('Please select a note first', 'assistant');
            return;
        }

        const noteContent = currentNote.content;

        // Check if this is a content generation command
        const generateCommands = [
            'generate', 'add', 'write', 'create', 'expand', 'brainstorm',
            'suggest', 'list', 'come up with'
        ];
        
        const isGenerateCommand = generateCommands.some(cmd => 
            message.toLowerCase().includes(cmd) && 
            message.toLowerCase().includes('note')
        );

        // Show thinking effect
        showAIThinking();

        // Prepare system prompt based on command type
        const systemPrompt = isGenerateCommand ? 
            `You are an AI assistant that generates high-quality content for notes. 
             When generating content:
             1. Format output in proper HTML with semantic tags (<h1>, <h2>, <p>, <ul>, <li>, etc.)
             2. Maintain a consistent style with existing content
             3. Be creative and detailed
             4. Focus on quality and relevance
             5. If adding to existing content, ensure smooth transition
             6. Use appropriate headings for structure
             7. ONLY output the HTML content, no explanations
             Current note content for context: "${noteContent}"` :
            'You are a helpful AI assistant for a notes app. Provide helpful responses and insights about the note content.';

        const userPrompt = isGenerateCommand ?
            `Based on this request: "${message}", generate appropriate HTML content that should be added to the note.` :
            `${message}\n\nCurrent Note Content: ${noteContent}`;

        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [
                    {
                        role: 'system',
                        content: systemPrompt
                    },
                    {
                        role: 'user',
                        content: userPrompt
                    }
                ],
                max_tokens: 1000,
                temperature: 0.7
            })
        });

        const data = await response.json();
        if (data.choices && data.choices[0]) {
            const aiResponse = data.choices[0].message.content;
            
            if (isGenerateCommand) {
                // Sanitize the generated HTML
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = aiResponse;
                sanitizeHTML(tempDiv);
                
                // Add the new content to the note with typing effect
                const currentContent = noteEditor.innerHTML;
                noteEditor.innerHTML = currentContent + '\n' + tempDiv.innerHTML;
                
                // Save the updated note
                saveCurrentNote();
                
                // Confirm to user
                addMessageToChat('I\'ve added the generated content to your note. Let me know if you\'d like any changes!', 'assistant');
            } else {
                // Regular chat response
                addMessageToChat(aiResponse, 'assistant');
            }
        }
    } catch (error) {
        console.error('Error:', error);
        addMessageToChat('Sorry, there was an error processing your request. Please try again.', 'assistant');
    } finally {
        // Hide thinking effect
        hideAIThinking();
    }
}

// Enhanced sanitizeHTML function
function sanitizeHTML(element) {
    const allowedTags = ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'strong', 'em', 'ul', 'ol', 'li', 'a', 'br'];
    const allowedAttributes = {
        'a': ['href']
    };
    
    function sanitizeNode(node) {
        if (node.nodeType === 1) { // Element node
            if (!allowedTags.includes(node.tagName.toLowerCase())) {
                return document.createTextNode(node.textContent);
            }
            
            // Remove all attributes except allowed ones
            const tagName = node.tagName.toLowerCase();
            const allowedAttrs = allowedAttributes[tagName] || [];
            
            Array.from(node.attributes).forEach(attr => {
                if (!allowedAttrs.includes(attr.name)) {
                    node.removeAttribute(attr.name);
                }
            });
            
            // Recursively sanitize child nodes
            Array.from(node.childNodes).forEach(child => {
                const sanitizedChild = sanitizeNode(child);
                if (sanitizedChild !== child) {
                    node.replaceChild(sanitizedChild, child);
                }
            });
        }
        return node;
    }
    
    Array.from(element.childNodes).forEach(node => {
        sanitizeNode(node);
    });
}

function addMessageToChat(message, sender) {
    const messageElement = document.createElement('div');
    messageElement.className = `chat-message ${sender}-message`;
    messageElement.textContent = message;
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Update handleTextSelection function
function handleTextSelection() {
    const selection = window.getSelection();
    const selectedText = selection.toString().trim();

    if (selectedText) {
        quickAIPanel.classList.add('visible');
        selectedTextDisplay.textContent = selectedText;
        
        // Add deep search section to Quick AI panel
        if (!quickAIPanel.contains(deepSearchSection)) {
            quickAIPanel.appendChild(deepSearchSection);
        }
        
        // Perform initial AI analysis
        performAIAnalysis(selectedText);
    } else {
        quickAIPanel.classList.remove('visible');
    }
}

// Add AI analysis functionality
let lastAnalysis = '';

async function performAIAnalysis(text) {
    const deepSearchResults = deepSearchSection.querySelector('.deep-search-results');
    deepSearchResults.innerHTML = `
        <div style="color: var(--text-secondary); text-align: center; padding: 20px;">
            AI is analyzing...
        </div>
    `;

    try {
        const prompt = `Please provide a deep analysis of this text: "${text}". Include:
1. Key concepts and their explanations
2. Related topics and connections
3. Potential implications or applications
4. Any relevant technical details
5. Common misconceptions or important clarifications`;

        const response = await sendToAI(prompt);
        lastAnalysis = response; // Store the analysis
        displayAIResults(response, deepSearchResults);
    } catch (error) {
        deepSearchResults.innerHTML = `
            <div style="color: var(--text-secondary); text-align: center; padding: 20px;">
                Error performing AI analysis. Please try again.
            </div>
        `;
    }
}

// Function to send prompt to AI
async function sendToAI(prompt) {
    if (!apiKey) {
        throw new Error('Please unlock the AI Assistant first');
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [
                {
                    role: 'system',
                    content: 'You are an AI assistant providing deep analysis of text. Be thorough but concise.'
                },
                {
                    role: 'user',
                    content: prompt
                }
            ],
            max_tokens: 500,
            temperature: 0.7
        })
    });

    const data = await response.json();
    if (data.choices && data.choices[0]) {
        return data.choices[0].message.content;
    }
    throw new Error('No response from AI');
}

// Function to display AI analysis results
function displayAIResults(analysisText, container, isModal = false) {
    // Convert the analysis text to HTML with proper formatting
    const formattedAnalysis = analysisText
        .split('\n')
        .map(line => {
            if (line.match(/^\d\./)) {
                return `<div class="analysis-point">${line}</div>`;
            } else if (line.trim().length === 0) {
                return '<br>';
            } else {
                return `<div class="analysis-text">${line}</div>`;
            }
        })
        .join('');

    container.innerHTML = `
        <div class="analysis-container${isModal ? ' modal-analysis' : ''}">
            ${formattedAnalysis}
        </div>
    `;
}

// Function to open analysis in modal
function openAnalysisModal(selectedText, analysisContent) {
    const modal = document.querySelector('.ai-analysis-modal');
    const selectedTextDisplay = modal.querySelector('.selected-text-display');
    const analysisContainer = modal.querySelector('.ai-analysis-content');
    
    selectedTextDisplay.innerHTML = `
        <div class="modal-selected-text">
            <h4>Selected Text:</h4>
            <div class="selected-text-content">${selectedText}</div>
        </div>
    `;
    
    // Display the analysis in the modal
    displayAIResults(analysisContent, analysisContainer, true);
    
    // Show the modal
    modal.classList.add('active');
}

// Add event listeners for modal
document.querySelector('.ai-analysis-modal .close-modal').addEventListener('click', () => {
    document.querySelector('.ai-analysis-modal').classList.remove('active');
});

// Add event listener for expand button
deepSearchSection.querySelector('.expand-analysis-btn').addEventListener('click', () => {
    const selectedText = selectedTextDisplay.textContent;
    if (selectedText && lastAnalysis) {
        openAnalysisModal(selectedText, lastAnalysis);
    }
});

// Handle quick AI actions
async function handleQuickAIAction(action) {
    if (!apiKey) {
        alert('Please unlock the AI Assistant first');
        return;
    }

    let prompt = '';
    let systemPrompt = '';
    
    switch (action) {
        case 'add-citations':
            systemPrompt = `You are a helpful AI assistant that adds academic citations. Rules:
                1. ONLY output the modified text with citations
                2. Add (Author, Year) citations inline
                3. Add a references section at the end
                4. Do not explain or add any other text
                5. Do not include the original text in quotes
                6. Example input: "Machine learning is transforming healthcare"
                   Example output: <p>Machine learning is transforming healthcare (Smith, 2023).</p><div class="references"><p>References:</p><p>Smith, J. (2023). The Impact of Machine Learning on Healthcare. Journal of Medical AI, 15(2), 45-67.</p></div>`;
            prompt = selectedText;
            break;
        case 'explain':
            prompt = `Explain the following text in simple terms: "${selectedText}"`;
            systemPrompt = 'You are a helpful AI assistant that provides clear and concise explanations.';
            break;
        case 'summarize':
            prompt = `Summarize the following text: "${selectedText}"`;
            systemPrompt = 'You are a helpful AI assistant that provides clear and concise summaries.';
            break;
        case 'expand':
            prompt = `Expand on the following text with more details and examples: "${selectedText}"`;
            systemPrompt = 'You are a helpful AI assistant that provides detailed expansions of text.';
            break;
        case 'summarize-section':
            prompt = `Create a concise summary of this section: "${selectedText}"`;
            systemPrompt = 'You are a helpful AI assistant that provides clear and concise summaries.';
            break;
        case 'improve-clarity':
            prompt = `Improve the clarity and readability of this text while maintaining its meaning: "${selectedText}"`;
            systemPrompt = 'You are a helpful AI assistant that improves text clarity while preserving meaning.';
            break;
        case 'fix-grammar':
            prompt = `Fix any grammatical errors in this text: "${selectedText}"`;
            systemPrompt = 'You are a helpful AI assistant that fixes grammar while preserving meaning.';
            break;
        case 'add-examples':
            prompt = `Add relevant examples to illustrate this concept: "${selectedText}"`;
            systemPrompt = 'You are a helpful AI assistant that provides relevant examples to clarify concepts.';
            break;
        case 'add-research':
            prompt = `Add research-backed information to support this statement: "${selectedText}"`;
            systemPrompt = 'You are a helpful AI assistant that adds research citations and evidence to support statements.';
            break;
    }

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [
                    {
                        role: 'system',
                        content: systemPrompt
                    },
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                max_tokens: 500,
                temperature: 0.7
            })
        });

        const data = await response.json();
        if (data.choices && data.choices[0]) {
            const editedText = data.choices[0].message.content;
            
            // For editing actions, replace the selected text
            if (['summarize-section', 'improve-clarity', 'fix-grammar', 'add-examples', 
                 'add-research', 'add-citations'].includes(action)) {
                const range = window.getSelection().getRangeAt(0);
                const tempDiv = document.createElement('div');
                
                // For citations, use the response directly as it's already in HTML format
                if (action === 'add-citations') {
                    tempDiv.innerHTML = editedText;
                } else {
                    // For other actions, wrap the text in a paragraph
                    tempDiv.innerHTML = `<p>${editedText}</p>`;
                }
                
                // Sanitize the HTML content
                sanitizeHTML(tempDiv);
                
                // Replace the selected text with the sanitized content
                range.deleteContents();
                
                // Insert each child node to preserve formatting
                Array.from(tempDiv.childNodes).forEach(node => {
                    range.insertNode(node.cloneNode(true));
                });
                
                // If this is a citation, ensure the references section is properly placed
                if (action === 'add-citations') {
                    const referencesDiv = tempDiv.querySelector('.references');
                    if (referencesDiv) {
                        // Move references to the end of the note
                        const existingRefs = noteEditor.querySelector('.references');
                        if (existingRefs) {
                            existingRefs.remove();
                        }
                        noteEditor.appendChild(referencesDiv.cloneNode(true));
                    }
                }
                
                saveCurrentNote();
            } else {
                // For non-editing actions, show in chat
                addMessageToChat(editedText, 'assistant');
            }
            
            quickAIPanel.style.display = 'none';
        }
    } catch (error) {
        console.error('Error:', error);
        addMessageToChat('Sorry, there was an error processing your request. Please try again.', 'assistant');
    }
}

// Handle tone change
async function handleToneChange(tone) {
    if (!apiKey) {
        alert('Please unlock the AI Assistant first');
        return;
    }

    const prompt = `Rewrite the following text in a ${tone} tone while maintaining its meaning: "${selectedText}"`;

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [
                    {
                        role: 'system',
                        content: 'You are a helpful AI assistant that can rewrite text in different tones while preserving the original meaning.'
                    },
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                max_tokens: 500
            })
        });

        const data = await response.json();
        if (data.choices && data.choices[0]) {
            const editedText = data.choices[0].message.content;
            const range = window.getSelection().getRangeAt(0);
            range.deleteContents();
            range.insertNode(document.createTextNode(editedText));
            saveCurrentNote();
            quickAIPanel.style.display = 'none';
        }
    } catch (error) {
        console.error('Error:', error);
        addMessageToChat('Sorry, there was an error processing your request. Please try again.', 'assistant');
    }
}

// Set editor mode
function setMode(mode) {
    isEditMode = mode === 'edit';
    const mainEditor = document.querySelector('.main-editor');
    
    // Remove all mode classes
    mainEditor.classList.remove('view-mode', 'edit-mode', 'code-mode');
    
    // Update mode buttons
    document.querySelectorAll('.mode-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.mode === mode);
    });
    
    // Add current mode class
    mainEditor.classList.add(`${mode}-mode`);
    
    // Update editor state
    noteEditor.contentEditable = (mode === 'edit').toString();
    
    // Show/hide formatting tools
    const formattingTools = document.querySelector('.formatting-tools');
    if (formattingTools) {
        formattingTools.style.display = mode === 'edit' ? 'flex' : 'none';
    }
    
    // Show/hide code editor
    if (codeEditor) {
        codeEditor.style.display = mode === 'code' ? 'grid' : 'none';
    }
    
    // Update editors content when switching to code mode
    if (mode === 'code') {
        const note = notes.find(n => n.id === currentNoteId);
        if (note && note.type === 'custom-html') {
            htmlEditor.value = note.htmlContent || '';
            cssEditor.value = note.cssContent || '';
        } else {
            // Convert rich text to HTML
            htmlEditor.value = noteEditor.innerHTML;
            cssEditor.value = note?.cssContent || getDefaultCSS();
        }
        updatePreview();
    }
}

// Update preview
function updatePreview() {
    if (!previewFrame) return;
    
    const html = htmlEditor.value;
    const css = cssEditor.value;
    
    const previewContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body {
                    margin: 0;
                    padding: 20px;
                    font-family: system-ui, -apple-system, sans-serif;
                }
                ${css}
            </style>
        </head>
        <body>
            ${html}
        </body>
        </html>
    `;
    
    const blob = new Blob([previewContent], { type: 'text/html' });
    previewFrame.src = URL.createObjectURL(blob);
}

// Get default CSS
function getDefaultCSS() {
    return `/* Add your custom CSS here */
body {
    color: #333;
    line-height: 1.6;
}

h1, h2, h3 {
    color: #2c3e50;
}

a {
    color: #3498db;
}

/* Add more styles as needed */`;
}

// Create a new tag
function createTag() {
    const name = tagNameInput.value.trim();
    const color = tagColorInput.value;

    if (!name) {
        alert('Please enter a tag name');
        return;
    }

    if (tags.some(tag => tag.name.toLowerCase() === name.toLowerCase())) {
        alert('A tag with this name already exists');
        return;
    }

    const newTag = {
        id: Date.now().toString(),
        name,
        color
    };

    tags.push(newTag);
    saveTags();
    renderTagsList();
    updateTagFilter();
    tagNameInput.value = '';
}

// Delete a tag
function deleteTag(tagId) {
    if (!confirm('Are you sure you want to delete this tag? It will be removed from all notes.')) {
        return;
    }

    // Remove tag from all notes
    notes = notes.map(note => ({
        ...note,
        tags: (note.tags || []).filter(id => id !== tagId)
    }));
    saveNotes();

    // Remove tag from tags list
    tags = tags.filter(tag => tag.id !== tagId);
    saveTags();

    renderTagsList();
    renderNotesList();
    updateTagFilter();
}

// Render tags list in the manage tags modal
function renderTagsList() {
    if (!tagsList) return;
    
    tagsList.innerHTML = tags.map(tag => `
        <div class="tag-item">
            <span class="tag-item-color" style="background-color: ${tag.color}"></span>
            <span class="tag-item-name">${tag.name}</span>
            <button class="delete-tag-btn" onclick="deleteTag('${tag.id}')">×</button>
        </div>
    `).join('');
}

// Update tag filter select options
function updateTagFilter() {
    if (!tagFilterSelect) return;

    tagFilterSelect.innerHTML = `
        <option value="all">All Tags</option>
        ${tags.map(tag => `
            <option value="${tag.id}">${tag.name}</option>
        `).join('')}
    `;
}

// Show note tags modal
function showNoteTagsModal() {
    if (!currentNoteId) {
        alert('Please select a note first');
        return;
    }

    const currentNote = notes.find(note => note.id === currentNoteId);
    const currentTags = currentNote.tags || [];

    noteTagsList.innerHTML = tags.map(tag => `
        <label class="tag-checkbox-item">
            <input type="checkbox" 
                   class="tag-checkbox" 
                   value="${tag.id}" 
                   ${currentTags.includes(tag.id) ? 'checked' : ''}>
            <span class="tag-item-color" style="background-color: ${tag.color}"></span>
            <span class="tag-item-name">${tag.name}</span>
        </label>
    `).join('');

    noteTagsModal.classList.add('active');
}

// Save note tags
function saveNoteTags() {
    if (!currentNoteId) return;

    const selectedTags = Array.from(noteTagsList.querySelectorAll('.tag-checkbox:checked'))
        .map(checkbox => checkbox.value);

    const noteIndex = notes.findIndex(note => note.id === currentNoteId);
    if (noteIndex !== -1) {
        notes[noteIndex].tags = selectedTags;
        saveNotes();
        renderNotesList();
    }

    noteTagsModal.classList.remove('active');
}

// Save tags to localStorage
function saveTags() {
    localStorage.setItem('tags', JSON.stringify(tags));
}

// Show context menu for note
function showNoteContextMenu(event, noteId) {
    if (!contextMenu || !contextMenuTags) return;

    const note = notes.find(n => n.id === noteId);
    if (!note) return;

    // Position the context menu
    contextMenu.style.top = `${event.pageY}px`;
    contextMenu.style.left = `${event.pageX}px`;

    // Create menu content
    let menuContent = `
        <div class="context-menu-header">Note Options</div>
        <div class="context-menu-section">
            <div class="context-menu-item ${note.encrypted ? 'context-menu-item-export' : ''}" 
                 onclick="exportEncryptedNote('${noteId}')"
                 style="${!note.encrypted ? 'display: none;' : ''}">
                Export Encrypted Note
            </div>
        </div>
        <div class="context-menu-header">Tags</div>
        <div class="context-menu-tags">
    `;

    // Get current note's tags
    const currentTags = note.tags || [];

    // Add tags
    menuContent += tags.map(tag => `
        <div class="context-menu-tag ${currentTags.includes(tag.id) ? 'selected' : ''}" 
             data-tag-id="${tag.id}" 
             data-note-id="${noteId}">
            <span class="context-menu-tag-color" style="background-color: ${tag.color}"></span>
            <span class="context-menu-tag-name">${tag.name}</span>
        </div>
    `).join('');

    menuContent += '</div>';
    contextMenu.innerHTML = menuContent;

    // Add click handlers for tags
    contextMenu.querySelectorAll('.context-menu-tag').forEach(tagElement => {
        tagElement.addEventListener('click', () => {
            const tagId = tagElement.dataset.tagId;
            const noteId = tagElement.dataset.noteId;
            toggleNoteTag(noteId, tagId);
            tagElement.classList.toggle('selected');
        });
    });

    // Show the context menu
    contextMenu.classList.add('active');
}

// Toggle tag on note
function toggleNoteTag(noteId, tagId) {
    const noteIndex = notes.findIndex(note => note.id === noteId);
    if (noteIndex === -1) return;

    const note = notes[noteIndex];
    note.tags = note.tags || [];

    // Toggle tag
    const tagIndex = note.tags.indexOf(tagId);
    if (tagIndex === -1) {
        note.tags.push(tagId);
    } else {
        note.tags.splice(tagIndex, 1);
    }

    // Save and update
    saveNotes();
    renderNotesList();
}

// Handle encrypt button click
function handleEncryptButtonClick() {
    if (!currentNoteId) return;

    const note = notes.find(n => n.id === currentNoteId);
    if (!note) return;

    isEncrypting = !note.encrypted;
    encryptionModalTitle.textContent = isEncrypting ? 'Encrypt Note' : 'Decrypt Note';
    encryptionSubmitBtn.textContent = isEncrypting ? 'Encrypt' : 'Decrypt';
    encryptionConfirmContainer.style.display = isEncrypting ? 'block' : 'none';
    encryptionPassword.value = '';
    encryptionConfirmPassword.value = '';
    encryptionModal.classList.add('active');
    encryptionPassword.focus();
}

// Update handleEncryptionSubmit function
async function handleEncryptionSubmit() {
    const password = encryptionPassword.value;
    if (!password) {
        alert('Please enter a password');
        return;
    }

    if (isEncrypting) {
        const confirmPassword = encryptionConfirmPassword.value;
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }
    }

    try {
        const note = notes.find(n => n.id === currentNoteId);
        if (!note) return;

        // Start animation
        const animationContainer = createLoadingAnimation();
        document.body.appendChild(animationContainer);
        
        // Set status text
        const statusElement = animationContainer.querySelector('.encryption-status');
        statusElement.textContent = isEncrypting ? 'Encrypting Note...' : 'Decrypting Note...';

        // Process after a slight delay to allow animation to start
        await new Promise(resolve => setTimeout(resolve, 100));

        if (isEncrypting) {
            // Encrypt the note
            const encrypted = await encryptNote(note.content, password);
            note.content = encrypted;
            note.encrypted = true;
            noteEditor.innerHTML = getEncryptedPlaceholder();
        } else {
            // Decrypt the note
            try {
                const decrypted = await decryptNote(note.content, password);
                note.content = decrypted;
                note.encrypted = false;
                
                // Add decryption transition
                noteEditor.style.opacity = '0';
                await new Promise(resolve => setTimeout(resolve, 300));
                noteEditor.innerHTML = decrypted;
                noteEditor.style.opacity = '1';
            } catch (error) {
                alert('Incorrect password');
                cleanupAnimation();
                return;
            }
        }

        // Update UI
        encryptBtn.classList.toggle('encrypted', note.encrypted);
        saveNotes();
        renderNotesList();
        
        // Cleanup animation after a delay
        setTimeout(() => {
            cleanupAnimation();
            encryptionModal.classList.remove('active');
            encryptionPassword.value = '';
            encryptionConfirmPassword.value = '';
        }, 1000);

    } catch (error) {
        console.error('Encryption error:', error);
        alert('An error occurred during encryption/decryption');
        cleanupAnimation();
    }
}

// Cleanup animation elements
function cleanupAnimation() {
    const container = document.querySelector('.encryption-animation-container');
    if (container) container.remove();
}

// Encrypt note content
async function encryptNote(content, password) {
    // Convert password to key
    const encoder = new TextEncoder();
    const passwordBuffer = encoder.encode(password);
    const salt = crypto.getRandomValues(new Uint8Array(16));
    const key = await deriveKey(passwordBuffer, salt);

    // Add metadata to content
    const metadata = {
        version: 1,
        timestamp: new Date().toISOString(),
        type: 'encrypted-note'
    };
    
    const contentWithMetadata = JSON.stringify({
        metadata,
        content
    });

    // Encrypt the content
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const contentBuffer = encoder.encode(contentWithMetadata);
    const encryptedBuffer = await crypto.subtle.encrypt(
        { name: 'AES-GCM', iv },
        key,
        contentBuffer
    );

    // Combine salt, iv, and encrypted content
    const encryptedArray = new Uint8Array(encryptedBuffer);
    const combined = new Uint8Array(salt.length + iv.length + encryptedArray.length);
    combined.set(salt, 0);
    combined.set(iv, salt.length);
    combined.set(encryptedArray, salt.length + iv.length);

    // Convert to base64 for storage
    return btoa(String.fromCharCode.apply(null, combined));
}

// Decrypt note content
async function decryptNote(encryptedContent, password) {
    try {
        // Convert from base64
        const combined = new Uint8Array(atob(encryptedContent).split('').map(c => c.charCodeAt(0)));
        
        // Extract salt, iv, and encrypted content
        const salt = combined.slice(0, 16);
        const iv = combined.slice(16, 28);
        const encryptedBuffer = combined.slice(28);

        // Derive key from password
        const encoder = new TextEncoder();
        const passwordBuffer = encoder.encode(password);
        const key = await deriveKey(passwordBuffer, salt);

        // Decrypt
        const decryptedBuffer = await crypto.subtle.decrypt(
            { name: 'AES-GCM', iv },
            key,
            encryptedBuffer
        );

        // Convert to string and parse metadata
        const decoder = new TextDecoder();
        const decryptedText = decoder.decode(decryptedBuffer);
        const { metadata, content } = JSON.parse(decryptedText);

        // Verify it's a valid encrypted note
        if (metadata.type !== 'encrypted-note') {
            throw new Error('Invalid encrypted note format');
        }

        return content;
    } catch (error) {
        throw new Error('Decryption failed');
    }
}

// Derive encryption key from password
async function deriveKey(passwordBuffer, salt) {
    const baseKey = await crypto.subtle.importKey(
        'raw',
        passwordBuffer,
        'PBKDF2',
        false,
        ['deriveKey']
    );

    return await crypto.subtle.deriveKey(
        {
            name: 'PBKDF2',
            salt,
            iterations: 100000,
            hash: 'SHA-256'
        },
        baseKey,
        { name: 'AES-GCM', length: 256 },
        false,
        ['encrypt', 'decrypt']
    );
}

// Get encrypted content placeholder
function getEncryptedPlaceholder() {
    return `
        <div class="encrypted-content-placeholder">
            <svg width="48" height="48" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2m3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2"/>
            </svg>
            <h3>This note is encrypted</h3>
            <p>Click the lock icon and enter your password to view the contents</p>
        </div>
    `;
}

// Export encrypted note
function exportEncryptedNote(noteId) {
    const note = notes.find(n => n.id === noteId);
    if (!note || !note.encrypted) return null;

    const exportData = {
        id: note.id,
        title: note.title,
        createdAt: note.createdAt,
        updatedAt: note.updatedAt,
        encrypted: true,
        content: note.content,
        type: 'encrypted-note',
        version: 1
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    // Create download link
    const a = document.createElement('a');
    a.href = url;
    a.download = `${note.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_encrypted.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Export functionality
function exportNote(format) {
    const currentNote = notes.find(note => note.id === currentNoteId);
    if (!currentNote) return;

    let content = '';
    const title = extractTitle(currentNote.content);
    const date = new Date(currentNote.createdAt).toLocaleDateString();

    switch (format) {
        case 'markdown':
            content = generateMarkdown(currentNote);
            downloadFile(`${title}.md`, content);
            break;
        case 'html':
            content = generateHTML(currentNote);
            downloadFile(`${title}.html`, content);
            break;
        case 'pdf-html':
            content = generatePDFHTML(currentNote);
            downloadFile(`${title}-pdf.html`, content);
            break;
        case 'text':
            content = generatePlainText(currentNote);
            downloadFile(`${title}.txt`, content);
            break;
        case 'pdf':
            generatePDF(currentNote);
            break;
    }
}

function generateMarkdown(note) {
    const title = extractTitle(note.content);
    const date = new Date(note.createdAt).toLocaleDateString();
    
    // Convert HTML to Markdown-like format
    let content = note.content
        .replace(/<h[1-6]>(.*?)<\/h[1-6]>/g, '# $1\n\n')
        .replace(/<p>(.*?)<\/p>/g, '$1\n\n')
        .replace(/<strong>(.*?)<\/strong>/g, '**$1**')
        .replace(/<em>(.*?)<\/em>/g, '*$1*')
        .replace(/<a href="(.*?)">(.*?)<\/a>/g, '[$2]($1)')
        .replace(/<br\s*\/?>/g, '\n')
        .replace(/<ul>(.*?)<\/ul>/g, '$1\n')
        .replace(/<ol>(.*?)<\/ol>/g, '$1\n')
        .replace(/<li>(.*?)<\/li>/g, '- $1\n');
    
    return `# ${title}\n\nCreated: ${date}\n\n${content.trim()}`;
}

function generateHTML(note) {
    const title = extractTitle(note.content);
    const date = new Date(note.createdAt).toLocaleDateString();
    
    return `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>${title}</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            max-width: 800px;
            margin: 40px auto;
            padding: 20px;
            color: #333;
        }
        h1 { margin-bottom: 10px; }
        .date { color: #666; margin-bottom: 30px; }
        .content { margin-top: 20px; }
    </style>
</head>
<body>
    <h1>${title}</h1>
    <div class="date">Created: ${date}</div>
    <div class="content">${note.content}</div>
</body>
</html>`;
}

function generatePDFHTML(note) {
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <title>${APP_NAME} - ${note.title || 'Untitled Note'}</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    max-width: 800px;
                    margin: 40px auto;
                    padding: 20px;
                    line-height: 1.6;
                }
                .header {
                    text-align: center;
                    margin-bottom: 30px;
                }
                .note-title {
                    font-size: 24px;
                    margin-bottom: 10px;
                }
                .note-date {
                    color: #666;
                    font-size: 14px;
                }
                .note-content {
                    margin-top: 30px;
                }
                .footer {
                    margin-top: 50px;
                    text-align: center;
                    font-size: 12px;
                    color: #666;
                }
                @media print {
                    .print-button {
                        display: none;
                    }
                }
            </style>
        </head>
        <body>
            <div class="header">
                <div class="note-title">${note.title || 'Untitled Note'}</div>
                <div class="note-date">Created on ${new Date(note.createdAt).toLocaleDateString()}</div>
            </div>
            <div class="note-content">
                ${note.content}
            </div>
            <div class="footer">
                Generated by ${APP_NAME}
            </div>
            <button class="print-button" onclick="window.print()" style="
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 10px 20px;
                background: #007bff;
                color: white;
                border: none;
                border-radius: 5px;
                cursor: pointer;
            ">Print/Save as PDF</button>
        </body>
        </html>
    `;
}

function generatePlainText(note) {
    const title = extractTitle(note.content);
    const date = new Date(note.createdAt).toLocaleDateString();
    
    // Convert HTML to plain text
    let content = note.content
        .replace(/<h[1-6]>(.*?)<\/h[1-6]>/g, '$1\n\n')
        .replace(/<p>(.*?)<\/p>/g, '$1\n\n')
        .replace(/<strong>(.*?)<\/strong>/g, '$1')
        .replace(/<em>(.*?)<\/em>/g, '$1')
        .replace(/<a href=".*?">(.*?)<\/a>/g, '$1')
        .replace(/<br\s*\/?>/g, '\n')
        .replace(/<ul>(.*?)<\/ul>/g, '$1\n')
        .replace(/<ol>(.*?)<\/ol>/g, '$1\n')
        .replace(/<li>(.*?)<\/li>/g, '* $1\n')
        .replace(/&nbsp;/g, ' ')
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"');
    
    return `${title}\n\nCreated: ${date}\n\n${content.trim()}`;
}

function downloadFile(filename, content) {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${APP_NAME}-${filename}`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
}

function generatePDF(note) {
    const title = extractTitle(note.content);
    const date = new Date(note.createdAt).toLocaleDateString();
    
    // Create the HTML content with proper styling
    const printContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>${title}</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    line-height: 1.6;
                    max-width: 800px;
                    margin: 40px auto;
                    padding: 20px;
                    color: #333;
                }
                h1 { 
                    font-size: 24pt;
                    margin-bottom: 10px;
                    color: #000;
                }
                .date { 
                    color: #666;
                    margin-bottom: 20px;
                }
                .content {
                    margin-top: 20px;
                }
                @media print {
                    body {
                        margin: 2.5cm;
                    }
                    .no-print {
                        display: none;
                    }
                }
            </style>
        </head>
        <body>
            <div class="no-print" style="position: fixed; top: 20px; right: 20px;">
                <button onclick="window.print()" style="
                    padding: 10px 20px;
                    background: #2a2a2a;
                    color: white;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                    font-size: 14px;
                ">Print/Save as PDF</button>
            </div>
            <h1>${title}</h1>
            <div class="date">Created: ${date}</div>
            <div class="content">
                ${note.content}
            </div>
        </body>
        </html>
    `;

    // Open in new tab
    const printWindow = window.open('', '_blank');
    printWindow.document.write(printContent);
    printWindow.document.close();
}

// Import note handling
async function handleImportNote() {
    const file = noteFileInput.files[0];
    const password = importPassword.value;

    if (!file || !password) {
        alert('Please select a file and enter the password');
        return;
    }

    try {
        const fileContent = await readFileContent(file);
        const importedNote = JSON.parse(fileContent);

        if (!importedNote.encrypted || !importedNote.content || importedNote.type !== 'encrypted-note') {
            throw new Error('Invalid encrypted note format');
        }

        // Try to decrypt the note
        try {
            const decryptedContent = await decryptNote(importedNote.content, password);
            
            // Create new note with decrypted content
            const newNote = {
                id: Date.now().toString(),
                title: importedNote.title || 'Imported Note',
                content: decryptedContent,
                type: 'rich-text',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                tags: [],
                encrypted: false,
                customDescription: '',
                useCustomDescription: false
            };

            // Add to notes array
            notes.unshift(newNote);
            saveNotes();
            currentNoteId = newNote.id;
            renderNotesList();
            loadNote(newNote.id);

            // Close modal and reset form
            importModal.classList.remove('active');
            noteFileInput.value = '';
            importPassword.value = '';
            selectedFileName.textContent = 'No file selected';
            importSubmitBtn.disabled = true;

            // Show success message
            alert('Note imported successfully!');
        } catch (error) {
            alert('Incorrect password or invalid file format');
        }
    } catch (error) {
        console.error('Import error:', error);
        alert('Error importing note. Please make sure the file is a valid encrypted note.');
    }
}

// Helper function to read file content
function readFileContent(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => resolve(event.target.result);
        reader.onerror = (error) => reject(error);
        reader.readAsText(file);
    });
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', init); 