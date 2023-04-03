export interface iHeaderProps {
  children?: React.ReactNode;
  solo: boolean;
}

export interface iModalContextProps {
  children: React.ReactNode;
}

export interface iModalContext {
  displayAddModal: boolean;
  toggleAddModal: () => void;
  displayEditModal: boolean;
  toggleEditModal: (contact?: iContact) => void;
  displayLoadingModal: boolean;
  toggleLoadingModal: () => void;
  toggleUserModal: (user?: iUser) => void;
  selectedContact: iContact;
  alertLoading: boolean;
  sendAlertLoading: () => void;
  setContactName: (newName: string) => void;
  setContactLastName: (newLastName: string) => void;
  setContactTelephone: (newTelephone: string) => void;
  setContactEmail: (newEmail: string) => void;
  clearContact: () => void;
  displayUserEditModal: boolean;
  userInfo: iUser;
  setInfoName: (newName: string) => void;
  setInfoLastName: (newLastName: string) => void;
  setInfoTelephone: (newTelephone: string) => void;
  setInfoEmail: (newEmail: string) => void;
  clearInfo: () => void;
}

export interface iContact {
  email: string;
  id: string;
  first_name: string;
  last_name: string;
  telephone: string;
  created_at: string;
}

export interface iContactArrayRes {
  data: iContact[];
}

export interface iUserRegister {
  name: string;
  last_name: string;
  email: string;
  password: string;
  passwordCheck: string;
  telephone: string;
}

export interface iUser {
  created_at?: string;
  email: string;
  id: string;
  name: string;
  last_name: string;
  telephone: string;
}

export interface iUserContextProps {
  children: React.ReactNode;
}

export interface iUserContext {
  isLoggedIn: boolean;
  logout: () => void;
  login: () => void;
  user: iUser;
  contacts: iContact[];
  isLoading: boolean;
  addContact: (contact: iContact) => void;
  updateContact: (editedContact: iContact) => void;
  removeContact: (deletedContact: iContact) => void;
  userRegister: iUserRegister;
  setRegisterName: (newName: string) => void;
  setRegisterLastName: (newLastName: string) => void;
  setRegisterPassword: (newPassword: string) => void;
  setRegisterPasswordCheck: (newPasswordCheck: string) => void;
  setRegisterTelephone: (newTelephone: string) => void;
  setRegisterEmail: (newEmail: string) => void;
  clearRegister: () => void;
  setNewUser: (newUser: iUser) => void;
}

export interface iUserRes {
  data: {
    id: string;
    name: string;
    last_name: string;
    email: string;
    telephone: string;
    created_at: string;
  };
}

export interface iLoginRes {
  data: {
    user: iUserRes;
    token: string;
  };
}

export interface iLoginUser {
  email: string;
  password: string;
}
