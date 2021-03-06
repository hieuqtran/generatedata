import React from 'react';
import Button from '@material-ui/core/Button';
import { Dialog, DialogTitle, DialogContent } from '~components/dialogs';

export type ClearType = 'dataOnly' | 'everything';

export type SignUpDialogProps = {
	visible: boolean;
	onClose: any;
	onClear: (clearType: ClearType) => void;
	i18n: any;
};

const SignUpDialog = ({ visible, onClose, onClear, i18n }: SignUpDialogProps): JSX.Element => {
	return (
		<Dialog onClose={onClose} open={visible}>
			<div style={{ width: 420 }}>
				<DialogTitle onClose={onClose}>Sign Up</DialogTitle>
				<DialogContent dividers>
					<div>
						<Button onClick={onClose} color="primary" variant="outlined">
							Sign Up
						</Button>
					</div>
				</DialogContent>
			</div>
		</Dialog>
	);
};

export default SignUpDialog;
