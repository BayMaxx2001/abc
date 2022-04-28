import React, { Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { CContainer, CSpinner } from '@coreui/react';

// routes config
import AuthRouter from 'src/AuthRouter';
import routes from '../routes';

const AppContent = () => (
  <CContainer lg>
    <Suspense fallback={<CSpinner color="primary" />}>
      <Routes>
        {routes.map(
          (route, idx) =>
            route.element && (
              <Route
                key={idx}
                path={route.path}
                exact={route.exact}
                name={route.name}
                element={
                  <AuthRouter>
                    <route.element />
                  </AuthRouter>
                }
              />
            ),
        )}
        <Route path="/" element={<Navigate to="dashboard" replace />} />
        <Route path="*" element={<Navigate to="404" replace />} />
      </Routes>
    </Suspense>
  </CContainer>
);

export default React.memo(AppContent);
