import { Menubar } from 'primereact/menubar';
import { PanelMenu } from 'primereact/panelmenu';
import { Button } from 'primereact/button';
import { Outlet, useNavigate } from 'react-router-dom';

export default function AppLayout() {
  const navigate = useNavigate();

  const start = <span className="text-xl font-bold">Sistema de Ponto</span>;
  const end = (
    <span className="text-white font-medium mr-4">👤 Isabelle Nunes</span>
  );

  const sidebarItems = [
    {
      label: 'Registro de Ponto',
      icon: 'pi pi-clock',
      command: () => navigate('/registro-ponto')
    },
    {
      label: 'Relatórios',
      icon: 'pi pi-chart-bar',
      command: () => navigate('/relatorios')
    }
  ];

  return (
    <div className="min-h-screen flex flex-column">
      <Menubar start={start} end={end} className="shadow-2" />

      <div className="flex flex-1">
        <div className="w-18rem border-right-1 surface-border p-3">
          <PanelMenu model={sidebarItems} className="w-full" />
          <div className="mt-4">
            <Button
              label="Sair"
              icon="pi pi-sign-out"
              className="p-button-danger p-button-text"
              onClick={() => {
                console.log("Logout...");
                navigate('/login');
              }}
            />
          </div>
        </div>

        <div className="flex-1 p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
