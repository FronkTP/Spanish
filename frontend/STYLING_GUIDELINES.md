# Frontend Styling Guidelines

## 2. Design Tokens

All styling should rely on theme tokens defined in `src/index.css`.

### Color Tokens

- `primary`: brand red
- `accent`: highlight yellow
- `background-light`: light page/card background
- `background-dark`: background contrast color

### Semantic Text Tokens

Use semantic text colors instead of random gray shades:

- `text-text-default`: default text
- `text-text-muted`: normal supporting copy
- `text-text-subtle`: important labels
- `text-text-faint`: not importatnt labels

// 1. Third-party libraries (React, hooks, UI frameworks)
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

// 2. Pages (Views)
import HomePage from '../pages/HomePage';
import DashboardPage from '../pages/DashboardPage';

// 3. Shared/Reusable Components
import Button from '../components/Button';
import Header from '../components/Header';

// 4. Utilities, Helpers, and Services
import { formatDate } from '../utils/helpers';
import { fetchUserData } from '../services/api';

// 5. Styles, Assets, and Local constants
import './UserProfile.css';
import logo from '../assets/logo.svg';

