use anchor_lang::prelude::*;

declare_id!("RdnxCRhkc1E6o2rL7agP5dmDLe1JkZenV5YehvedkeR");

#[program]
pub mod dictionary {
    use super::*;

    pub fn create_entry(ctx: Context<CreateEntry>, keyword: String, token_type: String, description: String, uses: String) -> Result<()> {
        let entry = &mut ctx.accounts.entry;
        entry.contributor = *ctx.accounts.user.key;
        entry.keyword = keyword;
        entry.tokentype = token_type;
        entry.description = description;
        entry.uses = uses;
        Ok(())
    }
}


#[derive(Accounts)]
pub struct CreateEntry<'info> {
	#[account(
		init, 
		payer=user, 
		space=10000, 
		seeds=[b"tokenaccount", user.key().as_ref()], 
		bump)]
	pub entry: Account<'info, Entry>,
	#[account(mut)]
	pub user: Signer<'info>,
	pub system_program: Program<'info, System>,
}

#[account]
pub struct Entry {
    pub keyword: String,
    pub tokentype: String,
    pub description: String,
    pub uses: String,
    pub contributor: Pubkey,
}