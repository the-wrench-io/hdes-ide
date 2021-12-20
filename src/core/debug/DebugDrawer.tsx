import React from 'react';
import {
  Box, List, Drawer, ListItem, ListItemIcon, ListItemText, Divider
} from '@mui/material';
import { SxProps } from '@mui/system';

import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import UploadIcon from '@mui/icons-material/Upload';

import { FormattedMessage } from 'react-intl';

import { Composer } from '../context';
import { DebugOptionType } from './api';


const DrawerOption: React.FC<{ onClick: () => void; label: string; icon: React.ReactElement; }> = ({ icon, onClick, label }) => {
  const itemSx: SxProps = { color: "explorerItem.main" }
  return (<ListItem button onClick={onClick}><ListItemIcon sx={itemSx}>{icon}</ListItemIcon><ListItemText sx={itemSx}><Box component="span" sx={itemSx}><FormattedMessage id={label} /></Box></ListItemText></ListItem>);
}
const DrawerSection: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (<><Box sx={{ width: "350px" }}><List>{children}</List></Box><Divider orientation="vertical" flexItem color="explorerItem.contrastColor" /></>)
}


const DebugDrawer: React.FC<{
  open: boolean,
  onClose: () => void,
  onSelect: (type: DebugOptionType) => void
}> = ({ open, onClose, onSelect }) => {

  const { session } = Composer.useComposer();
  const { site } = session;


  return (<Drawer anchor="top" open={open} onClose={onClose} sx={{ zIndex: "10000" }}>
    <Box sx={{ display: "flex", backgroundColor: "explorer.main", color: "primary.contrastText" }}>
      <DrawerSection>
        <DrawerOption label='debug.toolbar.selectAsset' icon={<SearchIcon />} onClick={() => onSelect('SELECT_ASSET')} />
        <DrawerOption label='debug.toolbar.inputCsv' icon={<UploadIcon />} onClick={() => onSelect('INPUT_CSV')} />
        <DrawerOption label='debug.toolbar.inputForm' icon={<EditIcon />} onClick={() => onSelect('INPUT_FORM')} />
        <DrawerOption label='debug.toolbar.inputJson' icon={<EditIcon />} onClick={() => onSelect('INPUT_JSON')} />
      </DrawerSection>
    </Box>
  </Drawer>);
}

export { DebugDrawer };
